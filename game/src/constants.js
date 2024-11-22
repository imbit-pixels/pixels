export let maps = [
    'almeria',
    'mensa',
    'klassenzimmer',
    'unternehmensausstellung',
]
export const music = [
    'cave_tuto',
    'eglise_orgue',
    'haunted'
]
export const scaleFactor = 4;

/**
 * @type {Record<string, {
  * title?: string,
  * text: string,
  * answers: string[],
  * correctAnswer?: number,
  * correctText?: string,
  * wrongText?: string,
 * }}
 */
export const dialogueData = {
  linde: {
    title: 'Baumstumpf',
    text: `Frage?\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium litora vehicula vulputate per proin lorem. Cum sem arcu aliquet montes enim vel magnis. Inceptos viverra dignissim scelerisque semper nunc eget odio. Dolor potenti lectus ante porttitor fusce morbi consequat. Himenaeos consequat pulvinar elit molestie pulvinar cubilia in. Congue egestas cum accumsan torquent per parturient enim. Risus id mauris elementum nullam aliquet egestas pellentesque. Curabitur curabitur ligula viverra fringilla tempus turpis justo. Velit nullam cubilia hac facilisi magna duis taciti. Adipiscing tortor class aliquet tincidunt pellentesque quis malesuada. Aenean conubia felis cras vehicula bibendum morbi gravida. Gravida porttitor est massa placerat tortor proin lacinia. Lacus id sociosqu aenean consectetur mauris ac nostra. Parturient senectus fermentum duis molestie natoque velit placerat. Bibendum ornare fermentum nascetur porta conubia suscipit at. Pellentesque at dictumst egestas velit tincidunt litora pellentesque. Lectus sociosqu senectus iaculis curabitur enim cum non. Dictumst vivamus lacinia facilisi dignissim leo proin morbi. Aptent suspendisse ornare feugiat morbi congue enim accumsan. Scelerisque hendrerit potenti faucibus dolor et rutrum ante. Dignissim urna nulla feugiat quisque venenatis rutrum enim. Ante maecenas porttitor ad ac tellus lectus convallis. Netus conubia adipiscing litora quis dui hac enim. Elit duis vitae nulla ipsum euismod felis congue. Platea aliquet at a at in sociis nullam. Nam vestibulum mattis ligula cum gravida leo tellus. Molestie mus duis inceptos phasellus laoreet tempus felis. Nulla volutpat congue primis adipiscing dui mattis commodo. Conubia accumsan tellus tempus tortor placerat platea condimentum. Vestibulum dolor ridiculus dui sit urna laoreet interdum. Vehicula urna id justo maecenas quam cras enim. Platea aliquet senectus inceptos risus fusce consectetur vulputate. Ante quam rutrum venenatis in tincidunt porta hac. Sem et eget senectus magnis bibendum quis integer. Laoreet eget himenaeos imperdiet semper urna sagittis senectus. Ultricies tempor venenatis hendrerit vehicula sit nisl fringilla. Pellentesque natoque potenti potenti mus turpis vulputate convallis. Tincidunt parturient molestie taciti fermentum euismod lacinia lectus. Cras tortor lacinia metus urna in faucibus risus. Leo quam egestas semper viverra eget leo arcu. Neque per quam ante tempus vulputate aliquam consectetur. Fusce lobortis curabitur primis elit proin posuere ad. Ullamcorper lacinia dictumst posuere sociosqu vulputate duis varius. Proin volutpat eleifend scelerisque sodales aliquam maecenas lectus. Facilisi nullam aptent arcu gravida suspendisse magna ullamcorper. Parturient taciti morbi volutpat ultricies erat odio praesent. Sapien elit consequat erat aliquam egestas faucibus sed. Purus pulvinar hac hac commodo ipsum cras et. Ac egestas sapien leo suspendisse massa accumsan sit.`,
    answers: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4',
    ],
    correctAnswer: 1, // = index of correct answer + 1
    correctText: 'Richtig!',
    wrongText: 'Falsch!',
  },
  baum: { 
    title: 'Baum',
    text: `Frage?\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium litora vehicula vulputate per proin lorem. Cum sem arcu aliquet montes enim vel magnis. Inceptos viverra dignissim scelerisque semper nunc eget odio.\n Dolor potenti lectus ante porttitor fusce morbi consequat. Himenaeos consequat pulvinar elit molestie pulvinar cubilia in. Congue egestas cum accumsan torquent per parturient enim.\n Risus id mauris elementum nullam aliquet egestas pellentesque. Curabitur curabitur ligula viverra fringilla tempus turpis justo. Velit nullam cubilia hac facilisi magna duis taciti.\n Adipiscing tortor class aliquet tincidunt pellentesque quis malesuada. Aenean conubia felis cras vehicula bibendum morbi gravida. Gravida porttitor est massa placerat tortor proin lacinia. Lacus id sociosqu aenean consectetur mauris ac nostra. Parturient senectus fermentum duis molestie natoque velit placerat. Bibendum ornare fermentum nascetur porta conubia suscipit at.\n Pellentesque at dictumst egestas velit tincidunt litora pellentesque. Lectus sociosqu senectus iaculis curabitur enim cum non. Dictumst vivamus lacinia facilisi dignissim leo proin morbi. Aptent suspendisse ornare feugiat morbi congue enim accumsan. Scelerisque hendrerit potenti faucibus dolor et rutrum ante. Dignissim urna nulla feugiat quisque venenatis rutrum enim. Ante maecenas porttitor ad ac tellus lectus convallis. Netus conubia adipiscing litora quis dui hac enim. Elit duis vitae nulla ipsum euismod felis congue. Platea aliquet at a at in sociis nullam. Nam vestibulum mattis ligula cum gravida leo tellus. Molestie mus duis inceptos phasellus laoreet tempus felis. Nulla volutpat congue primis adipiscing dui mattis commodo. Conubia accumsan tellus tempus tortor placerat platea condimentum. Vestibulum dolor ridiculus dui sit urna laoreet interdum. Vehicula urna id justo maecenas quam cras enim. Platea aliquet senectus inceptos risus fusce consectetur vulputate. Ante quam rutrum venenatis in tincidunt porta hac.\n Sem et eget senectus magnis bibendum quis integer. Laoreet eget himenaeos imperdiet semper urna sagittis senectus. Ultricies tempor venenatis hendrerit vehicula sit nisl fringilla. Pellentesque natoque potenti potenti mus turpis vulputate convallis. Tincidunt parturient molestie taciti fermentum euismod lacinia lectus. Cras tortor lacinia metus urna in faucibus risus. Leo quam egestas semper viverra eget leo arcu. Neque per quam ante tempus vulputate aliquam consectetur.\n Fusce lobortis curabitur primis elit proin posuere ad. Ullamcorper lacinia dictumst posuere sociosqu vulputate duis varius. Proin volutpat eleifend scelerisque sodales aliquam maecenas lectus. Facilisi nullam aptent arcu gravida suspendisse magna ullamcorper. Parturient taciti morbi volutpat ultricies erat odio praesent. Sapien elit consequat erat aliquam egestas faucibus sed. Purus pulvinar hac hac commodo ipsum cras et. Ac egestas sapien leo suspendisse massa accumsan sit.`,
    answers: [
      'Answer 1',
      'Answer 2',
      'Answer 3',
      'Answer 4',
    ],
    correctAnswer: 2, // = index of correct answer + 1
    correctText: 'Richtig!',
    wrongText: 'Falsch!',
  },
  exit: { 
    title: 'Exit',
    text: `Frage?\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium litora vehicula vulputate per proin lorem. Cum sem arcu aliquet montes enim vel magnis. Inceptos viverra dignissim scelerisque semper nunc eget odio.\n Dolor potenti lectus ante porttitor fusce morbi consequat. Himenaeos consequat pulvinar elit molestie pulvinar cubilia in. Congue egestas cum accumsan torquent per parturient enim.\n Risus id mauris elementum nullam aliquet egestas pellentesque. Curabitur curabitur ligula viverra fringilla tempus turpis justo. Velit nullam cubilia hac facilisi magna duis taciti.\n Adipiscing tortor class aliquet tincidunt pellentesque quis malesuada. Aenean conubia felis cras vehicula bibendum morbi gravida. Gravida porttitor est massa placerat tortor proin lacinia. Lacus id sociosqu aenean consectetur mauris ac nostra. Parturient senectus fermentum duis molestie natoque velit placerat. Bibendum ornare fermentum nascetur porta conubia suscipit at.\n Pellentesque at dictumst egestas velit tincidunt litora pellentesque. Lectus sociosqu senectus iaculis curabitur enim cum non. Dictumst vivamus lacinia facilisi dignissim leo proin morbi. Aptent suspendisse ornare feugiat morbi congue enim accumsan. Scelerisque hendrerit potenti faucibus dolor et rutrum ante. Dignissim urna nulla feugiat quisque venenatis rutrum enim. Ante maecenas porttitor ad ac tellus lectus convallis. Netus conubia adipiscing litora quis dui hac enim. Elit duis vitae nulla ipsum euismod felis congue. Platea aliquet at a at in sociis nullam. Nam vestibulum mattis ligula cum gravida leo tellus. Molestie mus duis inceptos phasellus laoreet tempus felis. Nulla volutpat congue primis adipiscing dui mattis commodo. Conubia accumsan tellus tempus tortor placerat platea condimentum. Vestibulum dolor ridiculus dui sit urna laoreet interdum. Vehicula urna id justo maecenas quam cras enim. Platea aliquet senectus inceptos risus fusce consectetur vulputate. Ante quam rutrum venenatis in tincidunt porta hac.\n Sem et eget senectus magnis bibendum quis integer. Laoreet eget himenaeos imperdiet semper urna sagittis senectus. Ultricies tempor venenatis hendrerit vehicula sit nisl fringilla. Pellentesque natoque potenti potenti mus turpis vulputate convallis. Tincidunt parturient molestie taciti fermentum euismod lacinia lectus. Cras tortor lacinia metus urna in faucibus risus. Leo quam egestas semper viverra eget leo arcu. Neque per quam ante tempus vulputate aliquam consectetur.\n Fusce lobortis curabitur primis elit proin posuere ad. Ullamcorper lacinia dictumst posuere sociosqu vulputate duis varius. Proin volutpat eleifend scelerisque sodales aliquam maecenas lectus. Facilisi nullam aptent arcu gravida suspendisse magna ullamcorper. Parturient taciti morbi volutpat ultricies erat odio praesent. Sapien elit consequat erat aliquam egestas faucibus sed. Purus pulvinar hac hac commodo ipsum cras et. Ac egestas sapien leo suspendisse massa accumsan sit.`,
    answers:[]
  },
};