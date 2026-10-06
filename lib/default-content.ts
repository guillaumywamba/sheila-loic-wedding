import type { SiteContent } from "@/types/site";

const galleryPhotos = [
  "ivt1JZBHbjSEJcRZ14LohS/pasted-image-1784207793113-zf1iv45h.jpeg",
  "r4SMjdxTFbsnFpPV5dnDNB/pasted-image-1784207793169-p587hox9.jpeg",
  "sgRS5mbGhp2kkdTUoga3d5/pasted-image-1784207793225-80yeofrp.jpeg",
  "66Si2vZHAEe6pKNgoBrYi4/pasted-image-1784207793287-47wrez0n.jpeg",
  "oWUfH5hxRGFHBz5mBckJve/pasted-image-1784207793339-elny3ay2.jpeg",
  "mAWZHYE8DsmsmrSeU4HztN/pasted-image-1784207793398-gpbzytfs.jpeg",
  "pNVRmGqrrfnSJvYjrsRZQk/pasted-image-1784207793450-m9nnk2b7.jpeg",
  "eV8BhBLUV56fJjNSoh97Zc/pasted-image-1784207793505-zxtz7es1.jpeg",
  "tmJHxj5TnTKBnQagstyb8W/pasted-image-1784207793574-m9mri046.jpeg",
  "mH98J14F48kVJa7QmNcXu6/pasted-image-1784207793630-hc1j5i8b.jpeg",
  "oMyCnrnMcpQnkw7Tprh7w3/pasted-image-1784207793692-7f8x5mvu.jpeg",
  "uTMxztc3emNRmeJ9V8puAF/pasted-image-1784207793759-awo3rzeb.jpeg",
  "3oEA8oPcseWtYnAy5DdLjp/pasted-image-1784207793825-nssdu52p.jpeg",
  "hQTTKGbVLBHTjtUujQAWYk/pasted-image-1784207793878-chw4riyd.jpeg",
  "8VFpFTTbve5vtNXifxNmba/pasted-image-1784207793931-w9m8yf9a.jpeg",
  "eXfo4vB2rWfd2r6R3nKde1/pasted-image-1784207793984-9ragpqpq.jpeg",
  "5A41Pefo16ADgPQizhdHDW/pasted-image-1784207794029-k2kfqtsi.jpeg",
  "ris4gnQB9FVgrmnJNADUeC/pasted-image-1784207794086-5im3f6xr.jpeg",
  "knW2mFQD6CACngHivyngtc/pasted-image-1784207794148-u4dfa1z4.jpeg",
  "1YhWpGhMC6fNPTmvubgAzW/pasted-image-1784207794200-8dtdknxz.jpeg",
  "9nLKs24T1Nd7GWDvSjKvWL/pasted-image-1784207794278-qehda9j2.jpeg",
  "eQqjVwQztiJuTodkLiWyty/pasted-image-1784207794356-hwwesjra.jpeg",
  "fcqDiSKxPfi5QSownk9ZXD/pasted-image-1784207794413-2u2l4d0n.jpeg",
  "6MsvitqtWjKCCjHmCwdH4z/pasted-image-1784207794470-1zebfshv.jpeg",
  "fn4WPr5RvrL5YHQ8ewVJuP/pasted-image-1784207794527-i6m8musw.jpeg",
  "idi5x46Umm76NsNz2KJeEG/pasted-image-1784207794588-2ru5dt5o.jpeg",
  "fdpYnK1qBJLPGYJJe9zZGW/pasted-image-1784207794645-mq7g9681.jpeg",
  "j7PEvZ7EFjSoP4FRaQAb14/pasted-image-1784207794698-sq8uo4f1.jpeg",
  "qtk4rw8LfySPCjt9JW1DWy/pasted-image-1784207794755-11ma0epv.jpeg",
  "27psi1y38EeyCkRdBz62Sg/pasted-image-1784207794810-r0s7v8fa.jpeg",
].map((path, i) => ({
  url: `https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/${path}`,
  alt: `Photo ${i + 1}`,
}));

export const defaultSiteContent: SiteContent = {
  meta: {
    title: "Sheila & Loïc Wedding Hub",
    description: "Site de mariage Sheila & Loïc — 02 & 03 Avril 2027",
    logo: "S & L",
  },
  navigation: [
    { id: "accueil", label: "Accueil", href: "#accueil" },
    { id: "evenements", label: "Événements", href: "#evenements" },
    { id: "logistique", label: "Logistique", href: "#logistique" },
    { id: "histoire", label: "Histoire", href: "#histoire" },
    { id: "galerie", label: "Galerie", href: "#galerie" },
    { id: "rsvp", label: "RSVP", href: "#rsvp" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  hero: {
    image:
      "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/oRwTmK3D4B6eH2A28gLm1W/pasted-image-1783864681994-z1y64ser.jpg",
    imageAlt: "Wedding",
    eyebrow: "Nous nous marions",
    title: "Sheila & Loïc",
    subtitle: "Scellent leur union sacrée devant Dieu et les Hommes",
    dateLabel: "DU 02 AU 03 AVRIL 2027",
    ctaLabel: "CONFIRMER VOTRE PRÉSENCE",
    ctaHref: "#rsvp",
    countdown: { date: "2027-04-02", time: "10:00" },
  },
  welcome: {
    title: "Bienvenue à tous,",
    paragraphs: [
      "Nous sommes très heureux de vous accueillir sur notre site de mariage. Ce jour si spécial ne serait pas le même sans vous.",
      "Votre présence, votre affection et votre soutien comptent énormément pour nous, et nous avons hâte de partager avec vous ces moments uniques remplis d'amour, de joie et d'émotions.",
      "À travers ce site, vous trouverez toutes les informations utiles concernant le déroulement de la journée, le lieu, le programme et les petits détails qui rendront cette célébration encore plus belle.",
      "Merci de faire partie de notre histoire. Nous avons hâte de célébrer ce magnifique chapitre de notre vie à vos côtés.",
    ],
    signature: "Avec tout notre amour,\nLes futurs mariés",
    carouselImages: [
      {
        url: "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/psYPJ2rXkqjjS4JMQDYDhT/pasted-image-1783865601457-fblwmhb0.jpg",
        alt: "Sheila & Loïc 1",
      },
      {
        url: "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/iLYRUEbi7DMR456kXAEWKG/pasted-image-1783865601490-kntw7w5n.jpg",
        alt: "Sheila & Loïc 2",
      },
      {
        url: "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/f3iAbQ78fm9UuvpUhqHpFR/pasted-image-1783865601515-rey0u1jw.jpg",
        alt: "Sheila & Loïc 3",
      },
      {
        url: "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/hVPnrzgRY44nmfukuWXVKA/pasted-image-1783865601541-e8t62kak.jpg",
        alt: "Sheila & Loïc 4",
      },
    ],
  },
  events: {
    title: "Aperçu des Événements",
    subtitle: "Sur la page informations logistiques",
    items: [
      {
        id: "civil",
        title: "Mariage Civil",
        date: "Vendredi 02 Avril 2027",
        startTime: "10h00",
        location: "Bonadjo - Mairie Dla 1er",
        image:
          "https://images.fillout.com/472067/mde81vgch5/generated-images/oM8noBuq9qDF4H47zo2eAs/img_I50yFLmBJ4vQQsGE.jpg",
        imageAlt: "Mariage Civil",
        logisticsTitle: "Détails Logistique",
        logisticsDetails:
          "Chers invités, Nous avons le plaisir de vous convier à notre mariage civil qui se tiendra le Vendredi 02 Avril à 10 heures à la mairie de Dla 1er. Nous vous prions d'arriver au plus tard 30 minutes avant le début de la cérémonie. Tenue souhaitée : élégante (couleurs : Bientôt disponible ...). Après la cérémonie, nous aurons le plaisir de vous recevoir au domicile familial des parents de Sheila à Bonaberi Derrière FOKOU partir de 14 heures. Nous avons hâte de partager ce moment avec vous.",
      },
      {
        id: "traditionnel",
        title: "Mariage Traditionnel",
        date: "Vendredi 02 Avril 2027",
        startTime: "15h00",
        location: "Bonaberi Derrière Fokou",
        image:
          "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/kTVsveHecSS27WkQHEVZty/pasted-image-1783869639006-66552grx.png",
        imageAlt: "Mariage Traditionnel",
        logisticsTitle: "Détails Logistique",
        logisticsDetails:
          "Chers invités, À la suite de notre mariage civil, nous avons le plaisir de vous convier à notre mariage traditionnel qui se tiendra le Vendredi 02 Avril 2027 à 14h00 au domicile familial des parents de Sheila, à Bonabéri derrière FOKOU, Douala. Tenue : traditionnelle ou élégante (couleurs bientôt disponibles). Nous avons hâte de partager avec vous ce moment de joie, de tradition et de célébration. Sheila & Loïc",
      },
      {
        id: "religieux",
        title: "Mariage Religieux",
        date: "Samedi 03 Avril 2027",
        startTime: "14h00",
        location: "Bientôt disponible",
        image:
          "https://images.fillout.com/472067/mde81vgch5/generated-images/whuZuxYN1x6C6ijjSoSUjv/img_Os5QqzcsGfHNWmVF.jpg",
        imageAlt: "Mariage Religieux",
        logisticsTitle: "Détails Logistique",
        logisticsDetails: "Détails logistiques bientôt disponibles...",
      },
      {
        id: "soiree",
        title: "Soirée",
        date: "Samedi 03 Avril 2027",
        startTime: "19h00",
        location: "SAPHIR GROUP EVENT - Makepe petit Pays",
        image:
          "https://images.fillout.com/472067/mde81vgch5/generated-images/uVjYo8V2bEnd1fefx5WJRq/img_C2pk6UOubSsp3vN9.jpg",
        imageAlt: "Soirée",
        logisticsTitle: "Détails Logistique",
        logisticsDetails: "Détails logistiques bientôt disponibles...",
      },
    ],
  },
  logistics: {
    title: "Informations logistiques",
    weddingDates: "Dates de Mariage : Du 02 au 03 Avril 2027",
    venuesTitle: "Lieux de Mariage",
    venuesLines: [
      "Vendredi 02 Avril, Mariage Civil : Mairie de Douala 1er (de 10h a 11h),",
      "Dot : Bonaberi Ancienne Route a partir de 15h Jusqu'à 20h,",
      "Samedi 03 Avril : Eglise EEC Douala (a definir) a 14h,",
      "Soirée a partir de 19h",
    ],
    dressCodeTitle: "Dress Code",
    dressCode:
      "Tissu pagne pour la mairie et la dote, Chic et glamour sur les couleurs Verte et Rose Pale pour la soirée.",
    accommodationTitle: "Hébergement des invités",
    accommodationSubtitle:
      "Recommandations d'Hotels/Logements meublés à proximité",
    coupleImage:
      "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/dHtkUHgAkfa9XH6iyRUKgG/pasted-image-1784204886671-3itw1zoc.jpg",
    coupleImageAlt: "Sheila & Loïc",
    tiers: [
      {
        id: "tier-1",
        priceRange: "30.000 - 40.000 FCFA",
        hotels: [
          {
            name: "La Folie Douce",
            address: "Situé à Santa Lucia Bonamoussadi",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=La+Folie+Douce+Santa+Lucia+Bonamoussadi+Douala",
          },
          {
            name: "T SQUARE Residence",
            address: "Situé à Yapaki Bonamoussadi",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=T+SQUARE+Residence+Yapaki+Bonamoussadi",
          },
        ],
      },
      {
        id: "tier-2",
        priceRange: "45.000 - 55.000 FCFA",
        hotels: [
          {
            name: "T SQUARE Residence",
            address: "Situé à Rond Poulin Makepe",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=T+SQUARE+Residence+Rond+Poulin+Makepe",
          },
          {
            name: "Saphir Group",
            address: "Situé à Makepe petit pays, Derrière Ecole russe",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=Saphir+Group+Makepe+Douala",
          },
        ],
      },
      {
        id: "tier-3",
        priceRange: "60.000 - 100.000 FCFA",
        hotels: [
          {
            name: "La Folie Douce",
            address: "Situé à Santa Lucia Bonamoussadi",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=La+Folie+Douce+Santa+Lucia+Bonamoussadi+Douala",
          },
          {
            name: "T SQUARE Residence",
            address: "Situé à Yapaki Bonamoussadi",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=T+SQUARE+Residence+Yapaki+Bonamoussadi",
          },
        ],
      },
      {
        id: "tier-4",
        priceRange: "120.000 - 200.000 FCFA",
        hotels: [
          {
            name: "T SQUARE Residence",
            address: "Situé à Rond Poulin Makepe",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=T+SQUARE+Residence+Rond+Poulin+Makepe",
          },
          {
            name: "Saphir Group",
            address: "Situé à Makepe petit pays, Derrière Ecole russe",
            mapsUrl:
              "https://www.google.com/maps/search/?api=1&query=Saphir+Group+Makepe+Douala",
          },
        ],
      },
    ],
  },
  biography: {
    title: "BIOGRAPHIE DU COUPLE",
    coupleName: "Sheila & Loïc",
    paragraphs: [
      "Leur histoire a commencé grâce à l'intuition bienveillante d'un proche qui voyait déjà en eux une belle complémentarité. Après quelques échanges marqués par la sincérité, la patience et la découverte mutuelle, ils se rencontrent pour la première fois à Paris, entre Lille et Bordeaux.",
      "Malgré la distance, une évidence s'installe rapidement. Conversation après conversation, voyage après voyage, leur complicité grandit et leur lien se renforce. Le 18 novembre 2023, ils décident de s'engager l'un envers l'autre et d'écrire ensemble un nouveau chapitre de leur vie.",
      "Aujourd'hui, entourés de leurs familles et de leurs proches, Sheila et Loïc célèbrent l'amour, la confiance et les valeurs qui les unissent, avec la joie de construire ensemble leur avenir.",
    ],
    image:
      "https://images.fillout.com/orgid-472067/flowpublicid-mde81vgch5/widgetid-default/4wt1F5L9c7EHQneV8jUYHu/pasted-image-1784207214137-8y5cvifg.jpg",
    imageAlt: "Sheila & Loïc 1",
  },
  story: {
    title: "Notre Histoire",
    paragraphs: [
      "Tout a commencé avec une étincelle discrète, comme une brise qui passe à travers les jours. C'est à travers un cousin ami d'enfance à Loïc que nous avons fait connaissance. Il parla de sa sœur à Loïc, une femme lumineuse qu'il voyait bien à ses côtés. Au début, Loïc résistait un peu, prudent, mais a fini par se laisser porter par cette intuition, et a donné son oui pour être mis en contact avec Sheila.",
      "Loïc, à Bordeaux, Sheila à Lille, ils ont choisi Paris pour se rencontrer. Ce fut leur premier rendez-vous, et chaque regard, chaque geste, chaque parole, était une promesse. Loïc, un peu timide, était fasciné par cette beauté, par son intelligence, et Sheila de son côté maniait les mots avec une grâce naturelle. Ils ont dîné, ont ri, ont rêvé, et ces deux heures ont filé comme un souffle.",
      "Depuis ce premier rendez-vous, ils ont continué à se parler, à bâtir une confiance, et une alchimie s'est créée. Chaque voyage, chaque moment, a renforcé leur amour. Bruxelles, sous la neige, Espagne, sous le soleil, puis Cameroun, où ils se sont présenté leur famille respective.",
      "En mai 2026, lors du toquer porte, lorsque les familles se sont rencontrées, il a su que tout était parfait pour s'engager définitivement. Ce jour-là, c'était l'anniversaire de Loïc, et à Paris, entourés de leurs proches, il s'est agenouillé, et a demandé à Sheila de devenir sa femme. Elle a dit oui, avec ce sourire qui a illuminé toute la pièce, et depuis ce jour, Sheila est officiellement devenue sa fiancée.",
      "Une histoire née d'un message, révélée par un regard, renforcée par des voyages, éprouvée par la vie, mais toujours victorieuse.\nUne histoire de deux âmes qui se sont trouvées, reconnues, choisies.\nUne histoire qui, aujourd'hui, devient une promesse éternelle.",
    ],
  },
  gallery: {
    title: "Galerie Photos",
    subtitle: "Notre petite histoire d'amour en quelques images...",
    photos: galleryPhotos,
  },
  gifts: {
    title: "Services & Cadeaux",
    message: "Bientôt disponible...",
    images: [
      {
        url: "https://images.fillout.com/472067/mde81vgch5/generated-images/jPe4VbdskKq6bKfFkoB2PS/img_mWcVDgR6M33p9Q7D.jpg",
        alt: "Cadeaux 1",
      },
      {
        url: "https://images.fillout.com/472067/mde81vgch5/generated-images/oM8noBuq9qDF4H47zo2eAs/img_I50yFLmBJ4vQQsGE.jpg",
        alt: "Cadeaux 2",
      },
      {
        url: "https://images.fillout.com/472067/mde81vgch5/generated-images/2wAPJpxtw4TWb8oYJhjVJA/img_ENPXUc7H3Vvw5Jse.jpg",
        alt: "Cadeaux 3",
      },
    ],
    detailsLabel: "Plus de détails",
    detailsHref: "#contact",
  },
  rsvp: {
    title: "RSVP",
    description:
      "Afin de nous permettre d'organiser au mieux cet événement, nous vous remercions de bien vouloir confirmer votre présence ou votre absence avant le 15 Mars 2027.",
    deadlineNote: "Date limite : 15 Mars 2027",
    submitLabel: "Confirmer Votre Présence",
    successTitle: "Merci!",
    successMessage: "Votre réponse a bien été enregistrée.",
  },
  contact: {
    title: "CONTACT",
    organization: "237 Wedding Concept",
    phone: "692 - 817 - 553",
  },
  footer: {
    copyright: "© 2026 Sheila & Loïc",
    credit: "Design By @Wedding Branding",
  },
};
