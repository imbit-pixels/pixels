import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import {displayDialogue, enableFullMapView, disableFullMapView, setCamScale} from "./utils";

k.loadSprite("spritesheet", "./spritesheet.png", {
	sliceX: 39,
	sliceY: 31,
	anims: {
		"idle-down": 936,
		"walk-down": { from: 936, to: 939, loop: true, speed: 8 },
		"idle-side": 975,
		"walk-side": { from: 975, to: 978, loop: true, speed: 8 },
		"idle-up": 1014,
		"walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
	},
});

k.loadSprite("dog-spritesheet", "./dog-spritesheet.png", {
	sliceX: 3,
	sliceY: 2,
	anims: {
		"dog-idle-side": 0,
		"dog-walk-side": { from: 0, to: 2, loop: true, speed: 8 },
	},
});

//läd das Bild der Karte im Hintergrund
k.loadSprite("map", "./map.png");
k.loadSprite("test-map", "./test-map.png");

//setzt die Hintergrundfarbe
k.setBackground(k.Color.fromHex("#311047"));

//LVL 1: SCENE MAIN 
k.scene("main", async () => {
	let isFullMapView = false;  // Variable to track if in full map view
	const showWorldMapBtn = document.getElementById("show-world-map");

	//Lädt die Mapdaten
	const mapData = await (await fetch("./map.json")).json();
	const layers = mapData.layers;

	//Fügt die Karte hinzu, macht sie sichtbar und skaliert sie
	const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

	//Erstellt den Spieler
	const player = k.make([
		k.sprite("spritesheet", { anim: "idle-down" }),
		k.area({
			shape: new k.Rect(k.vec2(0, 3), 10, 10),
		}),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(scaleFactor),
		{
			speed: 250,
			direction: "down",
			isInDialogue: false,
		},
		"player",
	]);

	const dog = k.make([
		k.sprite("dog-spritesheet", { anim: "dog-idle-side" }),
		k.area({
			shape: new k.Rect(k.vec2(0, 3), 10, 10),
		}),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(scaleFactor - 1.5),
		{
			speed: 250,
			direction: "right",
		},
		"dog",
	]);

	// Show full world map while holding down m key
	k.onKeyDown("m", () => {
		isFullMapView = true;
		stopAnims();
		enableFullMapView(k, map);
	});
	// Return to player view when releasing m key
	k.onKeyRelease("m", () => {
		isFullMapView = false;
		disableFullMapView(k);
	});

	showWorldMapBtn.addEventListener("click", () => {
		if (!isFullMapView) {
			isFullMapView = true;
			stopAnims();
			showWorldMapBtn.innerHTML = "Hide World Map (M)";
			enableFullMapView(k, map);
		} else {
			isFullMapView = false;
			showWorldMapBtn.innerHTML = "Show World Map (M)";
			document.getElementById("game").focus();
			disableFullMapView(k);
		}
	});

	k.onUpdate(() => {
		if (!isFullMapView) {
			// Follow the player only if not in full map view
			k.camPos(player.worldPos().x, player.worldPos().y - 100);
		}
	});

	//Fügt die Collider hinzu und prüft, ob der collider einen Namen hat. Wenn ja, wird ein Dialog angezeigt. Der dialog wird in der Datei constants.js definiert.
	for (const layer of layers) {
		if (layer.name === "boundaries") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x, boundary.y),
					boundary.name,
				]);

				if (boundary.name) {
					player.onCollide(boundary.name, () => {
						player.isInDialogue = true;
						displayDialogue(
							dialogueData[boundary.name],
							() => (player.isInDialogue = false)
						);
					});
				}
			}

			continue;
		}

		if (layer.name === "goto") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x, boundary.y),
					boundary.name,
				]);

				if (boundary.name) {
					player.onCollide(boundary.name, () => {
						k.go(boundary.name);
					});
				}
			}

			continue;
		}

		//Setzt den Spieler auf die Spawnposition
		if (layer.name === "spawnpoints") {
			for (const entity of layer.objects) {
				if (entity.name === "player") {
					player.pos = k.vec2(
						(map.pos.x + entity.x) * scaleFactor,
						(map.pos.y + entity.y) * scaleFactor
					);
					k.add(player);
					continue;
				}
				else if (entity.name === "dog") {
					dog.pos = k.vec2(
						(map.pos.x + entity.x) * scaleFactor,
						(map.pos.y + entity.y) * scaleFactor
					);
					k.add(dog);
					continue;
				}
			}
		}
	}

	setCamScale(k);

	k.onResize(() => {
		setCamScale(k);
	});

	//Bewegung des Spielers mit der Maus
	k.onMouseDown((mouseBtn) => {
		if (isFullMapView) return; // Disable player movement when in full map view
		if (mouseBtn !== "left" || player.isInDialogue) return;

		const worldMousePos = k.toWorld(k.mousePos());
		player.moveTo(worldMousePos, player.speed);

		const mouseAngle = player.pos.angle(worldMousePos);

		const lowerBound = 50;
		const upperBound = 125;

		if (
			mouseAngle > lowerBound &&
			mouseAngle < upperBound &&
			player.getCurAnim().name !== "walk-up"
		) {
			player.play("walk-up");
			player.direction = "up";
			return;
		}

		if (
			mouseAngle < -lowerBound &&
			mouseAngle > -upperBound &&
			player.getCurAnim().name !== "walk-down"
		) {
			player.play("walk-down");
			player.direction = "down";
			return;
		}

		if (Math.abs(mouseAngle) > upperBound) {
			player.flipX = false;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "right";
			return;
		}

		if (Math.abs(mouseAngle) < lowerBound) {
			player.flipX = true;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "left";
			return;
		}
	});

	function stopAnims() {
		if (player.direction === "down") {
			player.play("idle-down");
			return;
		}
		if (player.direction === "up") {
			player.play("idle-up");
			return;
		}

		player.play("idle-side");
	}

	function stopDogAnims() {
		if (dog.direction === "down") {
			dog.play("dog-idle-side");
			return;
		}
		if (dog.direction === "up") {
			dog.play("dog-idle-side");
			return;
		}

		dog.play("dog-idle-side");
	}

	k.onMouseRelease(stopAnims);

	k.onKeyRelease(() => {
		stopAnims();
		stopDogAnims();
	});
	k.onKeyDown((key) => {
		if (isFullMapView) return; // Disable player movement when in full map view
		const keyMap = [
			k.isKeyDown("right"),
			k.isKeyDown("left"),
			k.isKeyDown("up"),
			k.isKeyDown("down"),
			k.isKeyDown("d"),
			k.isKeyDown("a"),
			k.isKeyDown("w"),
			k.isKeyDown("s"),
		];

		let nbOfKeyPressed = 0;
		for (const key of keyMap) {
			if (key) {
				nbOfKeyPressed++;
			}
		}

		if (nbOfKeyPressed > 1) return;

		if (player.isInDialogue) return;

		//Player keyboard movement
		if (keyMap[0]) {
			player.flipX = false;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "right";
			player.move(player.speed, 0);
			return;
		}

		if (keyMap[1]) {
			player.flipX = true;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "left";
			player.move(-player.speed, 0);
			return;
		}

		if (keyMap[2]) {
			if (player.getCurAnim().name !== "walk-up") player.play("walk-up");
			player.direction = "up";
			player.move(0, -player.speed);
			return;
		}

		if (keyMap[3]) {
			if (player.getCurAnim().name !== "walk-down") player.play("walk-down");
			player.direction = "down";
			player.move(0, player.speed);
		}

		//Dog keyboard movement
		if (keyMap[4]) {
			dog.flipX = false;
			if (dog.getCurAnim().name !== "dog-walk-side") dog.play("dog-walk-side");
			dog.direction = "right";
			dog.move(dog.speed, 0);
			return;
		}

		if (keyMap[5]) {
			dog.flipX = true;
			if (dog.getCurAnim().name !== "dog-walk-side") dog.play("dog-walk-side");
			dog.direction = "left";
			dog.move(-dog.speed, 0);
			return;
		}

		if (keyMap[6]) {
			if (dog.getCurAnim().name !== "dog-walk-side") dog.play("dog-walk-side");
			dog.direction = "up";
			dog.move(0, -dog.speed);
			return;
		}

		if (keyMap[7]) {
			if (dog.getCurAnim().name !== "dog-walk-side") dog.play("dog-walk-side");
			dog.direction = "down";
			dog.move(0, dog.speed);
		}
	});
});

//LVL 2: SCENE TEST
k.scene("test", async () => {
	//Lädt die Mapdaten
	const mapData = await (await fetch("./test-map.json")).json();
	const layers = mapData.layers;

	//Fügt die Karte hinzu, macht sie sichtbar und skaliert sie
	const map = k.add([k.sprite("test-map"), k.pos(0), k.scale(scaleFactor)]);

	//Erstellt den Spieler
	const player = k.make([
		k.sprite("spritesheet", { anim: "idle-down" }),
		k.area({
			shape: new k.Rect(k.vec2(0, 3), 10, 10),
		}),
		k.body(),
		k.anchor("center"),
		k.pos(),
		k.scale(scaleFactor),
		{
			speed: 250,
			direction: "down",
			isInDialogue: false,
		},
		"player",
	]);

	//Fügt die Collider hinzu und prüft, ob der collider einen Namen hat. Wenn ja, wird ein Dialog angezeigt. Der dialog wird in der Datei constants.js definiert.
	for (const layer of layers) {
		if (layer.name === "bounderies") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x, boundary.y),
					boundary.name,
				]);

				if (boundary.name) {
					player.onCollide(boundary.name, () => {
						player.isInDialogue = true;
						displayDialogue(
							dialogueData[boundary.name],
							() => (player.isInDialogue = false)
						);
					});
				}
			}

			continue;
		}

		if (layer.name === "goto") {
			for (const boundary of layer.objects) {
				map.add([
					k.area({
						shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
					}),
					k.body({ isStatic: true }),
					k.pos(boundary.x, boundary.y),
					boundary.name,
				]);

				if (boundary.name) {
					player.onCollide(boundary.name, () => {
						k.go(boundary.name);
					});
				}
			}

			continue;
		}

		//Setzt den Spieler auf die Spawnposition
		if (layer.name === "spawnpoints") {
			for (const entity of layer.objects) {
				if (entity.name === "player") {
					player.pos = k.vec2(
						(map.pos.x + entity.x) * scaleFactor,
						(map.pos.y + entity.y) * scaleFactor
					);
					k.add(player);
					continue;
				}
			}
		}
	}
	
	setCamScale(k);

	k.onResize(() => {
		setCamScale(k);
	});

	k.onUpdate(() => {
		k.camPos(player.worldPos().x, player.worldPos().y - 100);
	});

	//Bewegung des Spielers mit der Maus
	k.onMouseDown((mouseBtn) => {
		if (mouseBtn !== "left" || player.isInDialogue) return;

		const worldMousePos = k.toWorld(k.mousePos());
		player.moveTo(worldMousePos, player.speed);

		const mouseAngle = player.pos.angle(worldMousePos);

		const lowerBound = 50;
		const upperBound = 125;

		if (
			mouseAngle > lowerBound &&
			mouseAngle < upperBound &&
			player.getCurAnim().name !== "walk-up"
		) {
			player.play("walk-up");
			player.direction = "up";
			return;
		}

		if (
			mouseAngle < -lowerBound &&
			mouseAngle > -upperBound &&
			player.getCurAnim().name !== "walk-down"
		) {
			player.play("walk-down");
			player.direction = "down";
			return;
		}

		if (Math.abs(mouseAngle) > upperBound) {
			player.flipX = false;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "right";
			return;
		}

		if (Math.abs(mouseAngle) < lowerBound) {
			player.flipX = true;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "left";
			return;
		}
	});

	function stopAnims() {
		if (player.direction === "down") {
			player.play("idle-down");
			return;
		}
		if (player.direction === "up") {
			player.play("idle-up");
			return;
		}

		player.play("idle-side");
	}

	k.onMouseRelease(stopAnims);

	k.onKeyRelease(() => {
		stopAnims();
	});
	k.onKeyDown((key) => {
		const keyMap = [
			k.isKeyDown("right"),
			k.isKeyDown("left"),
			k.isKeyDown("up"),
			k.isKeyDown("down"),
		];

		let nbOfKeyPressed = 0;
		for (const key of keyMap) {
			if (key) {
				nbOfKeyPressed++;
			}
		}

		if (nbOfKeyPressed > 1) return;

		if (player.isInDialogue) return;

		//Player keyboard movement
		if (keyMap[0]) {
			player.flipX = false;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "right";
			player.move(player.speed, 0);
			return;
		}

		if (keyMap[1]) {
			player.flipX = true;
			if (player.getCurAnim().name !== "walk-side") player.play("walk-side");
			player.direction = "left";
			player.move(-player.speed, 0);
			return;
		}

		if (keyMap[2]) {
			if (player.getCurAnim().name !== "walk-up") player.play("walk-up");
			player.direction = "up";
			player.move(0, -player.speed);
			return;
		}

		if (keyMap[3]) {
			if (player.getCurAnim().name !== "walk-down") player.play("walk-down");
			player.direction = "down";
			player.move(0, player.speed);
		}
	});
});

k.go("main");