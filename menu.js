// Données du restaurant et de la carte.
// ⚠️ La carte ci-dessous est un modèle : remplacez les plats et les prix
// par ceux de la carte officielle (vibebistrot.com/menu).
export const INFO = {
  name: "Vibe Bistrot",
  city: "Oran",
  address: "Boulevard Wahrani Boumediene, Oran, Algérie",
  hours: "Tous les jours · 11h00 – 23h00",
  mapsUrl: "https://maps.app.goo.gl/S6kcFGqgs5EVvik68",
  mapsEmbed: "https://www.google.com/maps?q=Vibe%20Bistrot%20Oran&output=embed",
  instagramUrl: "https://www.instagram.com/vibebistrot/",
  currency: "DA",
};

export const MENU = [
  {
    id: "brunch",
    title: "Brunch",
    subtitle: "Servi toute la journée",
    items: [
      { name: "Vibe Brunch", desc: "Œufs brouillés, avocat, saumon fumé, pain toasté, jus frais & boisson chaude", price: 1800, tag: "Signature" },
      { name: "Avocado Toast", desc: "Pain au levain, avocat écrasé, œuf poché, graines & piment d'Espelette", price: 950 },
      { name: "Pancakes Gourmands", desc: "Pancakes moelleux, fruits rouges, sirop d'érable & chantilly", price: 850 },
      { name: "Omelette du Bistrot", desc: "Trois œufs, fromage, champignons, herbes fraîches & salade", price: 750 },
      { name: "Croissant Saumon", desc: "Croissant pur beurre, saumon fumé, cream cheese & aneth", price: 1100 },
    ],
  },
  {
    id: "entrees",
    title: "Entrées & Salades",
    subtitle: "Pour commencer",
    items: [
      { name: "Salade César", desc: "Poulet grillé, romaine, parmesan, croûtons & sauce César maison", price: 1100 },
      { name: "Burrata Vibe", desc: "Burrata crémeuse, tomates cerises, pesto & huile d'olive vierge", price: 1400, tag: "Coup de cœur" },
      { name: "Soupe du Jour", desc: "Selon l'inspiration du chef", price: 500 },
      { name: "Tenders Croustillants", desc: "Filets de poulet panés, sauce maison", price: 850 },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    subtitle: "Servis avec frites maison",
    items: [
      { name: "Vibe Burger", desc: "Bœuf haché, cheddar affiné, oignons caramélisés, sauce secrète", price: 1400, tag: "Signature" },
      { name: "Double Smash", desc: "Double steak smashé, double cheddar, pickles & sauce burger", price: 1700 },
      { name: "Chicken Crispy", desc: "Poulet croustillant, coleslaw, sauce épicée", price: 1200 },
      { name: "Truffle Burger", desc: "Bœuf, crème de truffe, champignons poêlés & emmental", price: 1900 },
    ],
  },
  {
    id: "plats",
    title: "Plats & Pâtes",
    subtitle: "Cuisine du moment",
    items: [
      { name: "Entrecôte Grillée", desc: "Entrecôte, sauce au poivre, frites & légumes de saison", price: 2900 },
      { name: "Poulet à la Crème", desc: "Suprême de volaille, sauce champignons, riz ou purée", price: 1600 },
      { name: "Pâtes Alfredo", desc: "Fettuccine, crème, parmesan & poulet", price: 1300 },
      { name: "Pâtes Fruits de Mer", desc: "Linguine, crevettes, calamars, sauce tomate & ail", price: 1900 },
      { name: "Saumon Rôti", desc: "Pavé de saumon, beurre citronné, légumes grillés", price: 2600 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "Douceurs maison",
    items: [
      { name: "Fondant au Chocolat", desc: "Cœur coulant, boule de glace vanille", price: 750, tag: "Signature" },
      { name: "Cheesecake", desc: "Coulis de fruits rouges", price: 700 },
      { name: "Tiramisu", desc: "Recette traditionnelle au café", price: 700 },
      { name: "Crêpe Nutella", desc: "Crêpe fine, Nutella & noisettes torréfiées", price: 550 },
    ],
  },
  {
    id: "cafe",
    title: "Coffee Bar",
    subtitle: "Cafés de spécialité",
    items: [
      { name: "Espresso", desc: "", price: 250 },
      { name: "Cappuccino", desc: "", price: 400 },
      { name: "Latte", desc: "Nature, vanille, caramel ou noisette", price: 450 },
      { name: "Spanish Latte", desc: "Lait concentré sucré, double shot", price: 550, tag: "Best-seller" },
      { name: "Iced Latte", desc: "", price: 500 },
      { name: "Thé & Infusions", desc: "Sélection de thés", price: 300 },
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails & Jus",
    subtitle: "Sans alcool, avec vibe",
    items: [
      { name: "Vibe Mojito", desc: "Menthe fraîche, citron vert, soda", price: 600, tag: "Signature" },
      { name: "Passion Sunset", desc: "Fruit de la passion, orange, grenadine", price: 650 },
      { name: "Blue Lagoon", desc: "Curaçao sans alcool, citron, limonade", price: 600 },
      { name: "Jus Pressé", desc: "Orange, citron ou cocktail de fruits", price: 450 },
      { name: "Smoothie", desc: "Fraise-banane, mangue ou fruits rouges", price: 600 },
    ],
  },
];
