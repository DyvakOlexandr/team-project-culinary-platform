// src/data/recipes.ts
import image1 from "../assets/recepes/image_1.png";
import image2 from "../assets/recepes/recept_2.webp";
import image3 from "../assets/recepes/recept_3.webp";
import image4 from "../assets/recepes/recept_4.webp";
import image5 from "../assets/recepes/recept_5.webp";
import image6 from "../assets/recepes/recept_6.webp";
import image7 from "../assets/recepes/recept_7.webp";
import image8 from "../assets/recepes/recept_8.webp";
import image9 from "../assets/recepes/recept_9.webp";
import image10 from "../assets/recepes/recept_10.webp";
import image11 from "../assets/recepes/recept_11.webp";
import image12 from "../assets/recepes/recept_12.webp";
import image13 from "../assets/recepes/recept_13.webp";
import image14 from "../assets/recepes/recept_14.webp";
import image15 from "../assets/recepes/recept_15.webp";
import image16 from "../assets/recepes/recept_16.webp";
import image17 from "../assets/recepes/recept_17.webp";
import image18 from "../assets/recepes/recept_18.webp";
import image19 from "../assets/recepes/recept_19.webp";
import image20 from "../assets/recepes/recept_20.webp";
import image21 from "../assets/recepes/recept_21.webp";
import image22 from "../assets/recepes/recept_22.webp";
import image23 from "../assets/recepes/recept_23.webp";
import image24 from "../assets/recepes/recept_24.webp";
import image25 from "../assets/recepes/recept_25.webp";
import image26 from "../assets/recepes/recept_26.webp";
import image27 from "../assets/recepes/recept_27.webp";
import image28 from "../assets/recepes/recept_28.webp";
import image29 from "../assets/recepes/recept_29.webp";
import image30 from "../assets/recepes/recept_30.webp";
import image31 from "../assets/recepes/recept_31.webp";
import image32 from "../assets/recepes/recept_32.webp";
import image33 from "../assets/recepes/recept_33.webp";
import image34 from "../assets/recepes/recept_34.webp";
import image35 from "../assets/recepes/recept_35.webp";
import image36 from "../assets/recepes/recept_36.webp";
import image37 from "../assets/recepes/recept_37.webp";
import image38 from "../assets/recepes/recept_38.webp";
import image39 from "../assets/recepes/recept_39.webp";
import image40 from "../assets/recepes/recept_40.webp";
import image41 from "../assets/recepes/recept_41.webp";
import image42 from "../assets/recepes/recept_42.webp";
import image43 from "../assets/recepes/recept_43.webp";
import image44 from "../assets/recepes/recept_44.webp";
import image45 from "../assets/recepes/recept_45.webp";
import image46 from "../assets/recepes/recept_46.webp";
import image47 from "../assets/recepes/recept_47.webp";
import image48 from "../assets/recepes/recept_48.webp";
import image49 from "../assets/recepes/recept_49.webp";
import image50 from "../assets/recepes/recept_50.webp";
import image51 from "../assets/recepes/recept_51.webp";
import image52 from "../assets/recepes/recept_52.webp";
import image53 from "../assets/recepes/recept_53.webp";
import image54 from "../assets/recepes/recept_54.webp";
import image55 from "../assets/recepes/recept_55.webp";
import image56 from "../assets/recepes/recept_56.webp";
import image57 from "../assets/recepes/recept_57.webp";
import image58 from "../assets/recepes/recept_58.webp";
import image59 from "../assets/recepes/recept_59.webp";
import autorimage1 from "../assets/autors/autor_1.webp";
import autorimage2 from "../assets/autors/autor_2.webp"
import autorimage3 from "../assets/autors/autor_3.jpg"
import autorimage4 from "../assets/autors/autor_4.webp"
import autorimage5 from "../assets/autors/autor_5.webp"
import autorimage6 from "../assets/autors/autor_6.webp";
import autorimage7 from "../assets/autors/autor_7.webp"
import autorimage8 from "../assets/autors/autor_8.webp"
import autorimage9 from "../assets/autors/autor_9.webp"
import autorimage10 from "../assets/autors/autor_10.webp"
import autorimage11 from "../assets/autors/autor_11.webp"
import autorimage12 from "../assets/autors/autor_12.webp"
import autorimage13 from "../assets/autors/autor_13.webp"
import autorimage14 from "../assets/autors/autor_14.webp"
import autorimage15 from "../assets/autors/autor_15.webp"
import autorimage16 from "../assets/autors/autor_16.webp"
import autorimage17 from "../assets/autors/autor_17.webp"
import autorimage18 from "../assets/autors/autor_18.webp"

export interface Recipe {
  id: string;
  title: string;
  author: string;
  complexity: string;
  time?: string;
  rating?: number;
    image?: string; 
  authorImage?: string;
}

export interface Author {
  id: string;
  name: string;
  email?: string; 
  profession: string;
  recipesCount?: number;
  followers?: number;
  image? :string;
}

export interface Section {
  title: string;
  type: "recipes" | "authors";
  items: Recipe[] | Author[];
  link?: string;
}



// --- Рецепты ---
export const recommendedRecipes: Recipe[] = [
  { id: "r1", title: " Ідеальний гарбузовий пиріг", author: "Лілія Климчук",authorImage: autorimage14, complexity: "Легко", time: "2 год 45 хв", rating: 4.7,  image: image1   },
  { id: "r2", title: "Полуничне сирне морозиво з крихтами", author: "Марія Шевченко",authorImage: autorimage13, complexity: "Помірно", time: "4 год 15 хв", rating: 4.3,  image: image2  },
  { id: "r3", title: "Швидкий тортилья-кіш", author: "Юлія Романенко",authorImage: autorimage1, complexity: "Легко", time: "17 хв", rating: 4.9 , image: image3},
  { id: "r10", title: "Міні-бургери з яйцем", author: "Юлія Романенко", complexity: "Легко", time: "15 хв", rating: 4.9 , image: image10},
  { id: "r11", title: "Сніданкова тортилья-піца", author: "Юлія Романенко", complexity: "Легко", time: "10 хв", rating: 4.9 , image: image11},
   { id: "r12", title: "Запечені оніґірі з бататом та авокадо", author: "Юлія Романенко", complexity: "Помірно", time: "1 год", rating: 4.9 , image: image12},
   { id: "r13", title: "Сніданкова боул-тарілка з бататом", author: "Юлія Романенко", complexity: "Легко", time: "35 хв", rating: 4.9 , image: image13},
    { id: "r14", title: "Фрикадельки з сиром рікота та моцарела", author: "Юлія Романенко", complexity: "Легко", time: "30 хв", rating: 4.9 , image: image14},
   { id: "r15", title: "Паста з яловичиною та вершковим соусом", author: "Юлія Романенко", complexity: "Легко", time: "25 хв", rating: 4.9 , image: image15},  
    { id: "r16", title: "Легка запіканка з тортильї з начинкою", author: "Юлія Романенко", complexity: "Легко", time: "1 год 5хв", rating: 4.9 , image: image16},
     { id: "r17", title: "Шаурма з куркою", author: "Юлія Романенко", complexity: "Легко", time: "1 год 25хв", rating: 4.9 , image: image17},
     { id: "r18", title: "Салат із запеченого нуту з ніжною кремовою заправкою", author: "Юлія Романенко", complexity: "Легко", time: "30хв", rating: 4.9 , image: image18},
       { id: "r19", title: "Тако з цвітної капусти та кіноа", author: "Юлія Романенко", complexity: "Легко", time: "1 год", rating: 4.9 , image: image19},    
       { id: "r20", title: "Лосось із кунжутом та салат з рисової локшини", author: "Юлія Романенко", complexity: "Легко", time: "45 хв", rating: 4.9 , image: image20},
           { id: "r21", title: "Боул із креветками та манговою сальсою", author: "Юлія Романенко", complexity: "Легко", time: "45 хв", rating: 4.9 , image: image21},
      { id: "r22", title: "Качині грудки з винним соусом і запеченим виноградом", author: "Юлія Романенко", complexity: "Легко", time: "40 хв", rating: 4.9 , image: image22},
      { id: "r23", title: "Смажені на пательні свинячі відбивні", author: "Юлія Романенко", complexity: "Легко", time: "40 хв", rating: 4.9 , image: image23},           
];

export const popularRecipes: Recipe[] = [
  { id: "r4", title: "Песто і смаженим свиним фаршем", author: "Дмитро Савченко",authorImage: autorimage17, complexity: "Легко", time: "20 хв", rating: 4.7, image: image4 },
  { id: "r5", title: "Курка ескабече з халапеньйо, золотим родзинком та м’ятою", author: "Юлія Мельник", complexity: "Легко", time: "46 хв", rating: 4.3, image: image5 },
  { id: "r6", title: "Оливкові мафіни з чорним шоколадом", author: "Софія Дорошенко",authorImage: autorimage16, complexity: "Помірно", time: "45 хв", rating: 4.9, image: image6 },
  { id: "r24", title: "Легка галета з персиками на листковому тісті з морозивом", author: "Юлія Романенко", complexity: "Легко", time: "40 хв", rating: 4.9 , image: image24},
  { id: "r25", title: "Салат із слив та фенхелю з заправкою з імбиру й меду", author: "Юлія Романенко", complexity: "Помірно", time: "30 хв", rating: 4.9 , image: image25},
  { id: "r26", title: "Салат із куркою, персиками та манго", author: "Юлія Романенко", complexity: "Легко", time: "45 хв", rating: 4.9 , image: image26},
   { id: "r27", title: "Домашній йогурт із ягодами та натуральним смаком", author: "Юлія Романенко", complexity: "Легко", time: "10 хв", rating: 4.9 , image: image27},
    { id: "r28", title: "Хот-дог бар (асорті на дошці з хот-догами)", author: "Юлія Романенко", complexity: "Легко", time: "40 хв", rating: 4.9 , image: image28},
   { id: "r29", title: "Бургери з лососем", author: "Юлія Романенко", complexity: "Легко", time: "49 хв", rating: 4.9 , image: image29},  
  { id: "r30", title: "Салат із яблук та кіноа з солодкою тахінною заправкою", author: "Юлія Романенко", complexity: "Легко", time: "30 хв", rating: 4.9 , image: image30}, 
  { id: "r31", title: "Курка з лаймом та кінзовим рисом", author: "Юлія Романенко", complexity: "Легко", time: "40 хв", rating: 4.9 , image: image31},   
  { id: "r32", title: "Курка в соусі кочуджан, обсмажена з овочами", author: "Юлія Романенко", complexity: "Легко", time: "30 хв", rating: 4.9 , image: image32},   
 { id: "r33", title: "Шотландські яйця", author: "Юлія Романенко", complexity: "Легко", time: "1 год 15 хв", rating: 4.9 , image: image33},
  { id: "r34", title: "Веганська ригатоні-пиріг з гарбузом", author: "Юлія Романенко", complexity: "Легко", time: "45 хв", rating: 4.9 , image: image34},   
  { id: "r35", title: "Запечена цвітна капуста з нутом і гірчичною заправкою", author: "Юлія Романенко", complexity: "Легко", time: "1 год 10 хв", rating: 4.9 , image: image35},
  { id: "r36", title: "Обсмажені помідори з яєчнею-бовтанкою", author: "Юлія Романенко", complexity: "Легко", time: "15 хв", rating: 4.9 , image: image36},
  { id: "r37", title: "Сендвіч із грильованими овочами та песто", author: "Юлія Романенко", complexity: "Легко", time: "40 хв", rating: 4.9 , image: image37},
   { id: "r38", title: "Бургер у стилі Рілаккума", author: "Юлія Романенко", complexity: "Складно", time: "1 год", rating: 4.9 , image: image38},
     { id: "r39", title: "Китайська парова курка з сушеними грибами шиїтаке", author: "Юлія Романенко", complexity: "Складно", time: "1 год 40 хв", rating: 4.9 , image: image39},
    { id: "r40", title: "Паста з куркою по-тосканськи в кремовому соусі", author: "Юлія Романенко", complexity: "Складно", time: "30 хв", rating: 4.9 , image: image40},
    { id: "r41", title: "Суп із молюсків у кремово-томатному стилі", author: "Юлія Романенко", complexity: "Складно", time: "1 год", rating: 4.9 , image: image41},
];

export const summerOffers: Recipe[] = [
  { id: "r7", title: "Грецький салат з нутом", author: "Богдан Іваненко",authorImage: autorimage15, complexity: "Легко", time: "20 хв", rating: 4.7, image: image7 },
  { id: "r8", title: "Суші «Грецький салат»", author: "Марія Шевченко", complexity: "Складно", time: "10 хв", rating: 4.3, image: image8 },
  { id: "r9", title: "Запечені картопля з бальзамічним соусом", author: "Анастасія Гончар",authorImage: autorimage4, complexity: "Помірно", time: "55 хв", rating: 4.9, image: image9 },
  { id: "r42", title: "Солона яблучна тарталетка на хрусткому тісті", author: "Юлія Романенко", complexity: "Помірно", time: "1 год 40 хв", rating: 4.9, image: image42},
  { id: "r43", title: "Апельсинове пісочне печиво", author: "Юлія Романенко", complexity: "Помірно", time: "35 хв", rating: 4.9, image: image43},
  { id: "r44", title: "Шоколадний мус із 2 інгредієнтів", author: "Юлія Романенко", complexity: "Помірно", time: "2 год 40 хв", rating: 4.9, image: image44},
  { id: "r45", title: "Індичка та прошутто з глазур’ю з портвейну", author: "Юлія Романенко", complexity: "Помірно", time: "35 хв", rating: 4.9, image: image45},
  { id: "r46", title: "Шведські фрикадельки", author: "Юлія Романенко", complexity: "Помірно", time: "40 хв", rating: 4.9, image: image46},
  { id: "r47", title: "Паста з фундука, шоколаду та фініків", author: "Юлія Романенко", complexity: "Помірно", time: "45 хв", rating: 4.9, image: image47},
  { id: "r48", title: "Легка яблучна галета", author: "Юлія Романенко", complexity: "Помірно", time: "1 год 40 хв", rating: 4.9, image: image48},
   { id: "r49", title: "Корисний гарбузовий смузі", author: "Юлія Романенко", complexity: "Помірно", time: "5 хв", rating: 4.9, image: image49},
  { id: "r50", title: "Свіжий томатний суп із базиліком", author: "Юлія Романенко", complexity: "Помірно", time: "30 хв", rating: 4.9, image: image50},
  { id: "r51", title: "Свинина на одній пательні з карамелізованими яблуками", author: "Юлія Романенко", complexity: "Помірно", time: "30 хв", rating: 4.9, image: image51},
  { id: "r52", title: "Печиво з гарбуза та шоколадних крапель", author: "Юлія Романенко", complexity: "Помірно", time: "1 год 30 хв", rating: 4.9, image: image52},
   { id: "r53", title: "Тонкацу з рисом із кінзи та граната", author: "Юлія Романенко", complexity: "Помірно", time: "20 хв", rating: 4.9, image: image53},
    { id: "r54", title: "Лосось з рисом у апельсиново-медовій глазурі", author: "Юлія Романенко", complexity: "Помірно", time: "40 хв", rating: 4.9, image: image54},
  { id: "r55", title: "Лате з гарбузом і прянощами", author: "Юлія Романенко", complexity: "Помірно", time: "15 хв", rating: 4.9, image: image55},
   { id: "r56", title: "Тушкована карибська курка в пряному соусі", author: "Юлія Романенко", complexity: "Помірно", time: "1 год 30 хв", rating: 4.9, image: image56},
  { id: "r57", title: "М’ясний рулет, фарширований кремовими грибами", author: "Юлія Романенко", complexity: "Помірно", time: "1 год 30 хв", rating: 4.9, image: image57},
   { id: "r58", title: "Суп із курки та сочевиці", author: "Юлія Романенко", complexity: "Помірно", time: "45 хв", rating: 4.9, image: image58},
    { id: "r59", title: "Кіноа-страви зі шпинатом та яйцем у формочках", author: "Юлія Романенко", complexity: "Помірно", time: "45 хв", rating: 4.9, image: image59},
];

// --- Авторы ---
export const popularAuthors: Author[] = [
  { id: "a1", name: "Юлія Романенко", email: "yulia.romanenko@example.com",profession: "Веган-шеф", recipesCount: 56, followers: 32500, image: autorimage1 },
  { id: "a2", name: "Марко Левченко", email: "maria.levchenko@example.com", profession: "Шеф-кухар", recipesCount: 78, followers: 22400, image: autorimage2 },
  { id: "a3", name: "Катерина Бондар", email: "kateryna.bondar@example.com", profession: "Кондитер", recipesCount: 70, followers: 22100, image: autorimage3},
  { id: "a4", name: "Анастасія Гончар", email: "yulia.fitness@example.com", profession: "Фітнес-нутриціолог", recipesCount: 89, followers: 12500, image: autorimage4 },
  { id: "a5", name: "Максим Петренко", email: "@liliaCooks", profession: " Домашній кулінар ", recipesCount: 48, followers: 8700, image: autorimage5 },
  { id: "a6", name: "Тарас Бондар", email: "yulia.romanenko@example.com",profession: " Шеф-кухар", recipesCount: 112, followers: 45200, image: autorimage6 },
  { id: "a7", name: "Марія Гаврилюк", email: "maria.levchenko@example.com", profession: "Домашній кулінар", recipesCount: 76, followers: 5400, image: autorimage7 },
  { id: "a8", name: "Юлія Пастушенко", email: "kateryna.bondar@example.com", profession: " Домашній кулінар", recipesCount: 89, followers: 19800, image: autorimage8},
  { id: "a9", name: "Софія Паньків", email: "yulia.fitness@example.com", profession: " Кондитер", recipesCount: 95, followers: 6100, image: autorimage9},
  { id: "a10", name: "Галина Левчук", email: "@liliaCooks", profession: "Фітнес-нутриціолог ", recipesCount: 123, followers: 58300, image: autorimage10 },
   { id: "a11", name: "Валентина Кушнір ", email: "yulia.fitness@example.com", profession: " Шеф-кухар", recipesCount: 64, followers: 3200, image: autorimage11},
  { id: "a12", name: "Кирило Олійник", email: "@liliaCooks", profession: "Експерт з напоїв", recipesCount: 98, followers: 7500, image: autorimage12 },





];

// --- Секции для Home ---
export const sections: Section[] = [
  { 
    title: "Рекомендовано для тебе", 
    type: "recipes", 
    items: recommendedRecipes,
    link: "/recipes/recommended" 
  },
  { 
    title: "Популярне зараз", 
    type: "recipes", 
    items: popularRecipes,
    link: "/recipes/popular"
  },
  { 
    title: "Популярні автори", 
    type: "authors", 
    items: popularAuthors,
    link: "/authors"
  },
];

// --- Утилита для получения всех рецептов ---
export const getAllRecipes = (): Recipe[] => [
  ...recommendedRecipes,
  ...popularRecipes,
  ...summerOffers,
];
export const getAllAuthors = (): Author[] => [
  ...popularAuthors,
];