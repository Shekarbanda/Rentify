const ROLES = {
  ADMIN: "admin",
  USER: "individual",
  BUSINESSOWNER: "business",
};

const ITEM_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const ITEM_CATEGORIES = [
  {
    name: "CARS",
    subcategories: [],
  },
  {
    name: "BIKES",
    subcategories: ["motorcycles", "scooters"],
  },
  {
    name: "PROPERTIES",
    subcategories: [
      "for_rent_houses_apartments",
      "for_rent_shops_offices",
      "pg_guest_houses",
    ],
  },
  {
    name: "COMMERCIAL_VEHICLES",
    subcategories: ["commercial_other_vehicles"],
  },
  {
    name: "FURNITURE",
    subcategories: [
      "sofa_dining",
      "beds_wardrobes",
      "home_decor_garden",
      "kids_furniture",
      "other_household_items",
    ],
  },
  {
    name: "ELECTRONICS",
    subcategories: [
      "tvs_video_audio",
      "kitchen_appliances",
      "computers_laptops",
      "cameras_lenses",
      "games_entertainment",
    ],
  },
  {
    name: "SPORTS_EQUIPMENT",
    subcategories: ["gym_fitness", "sports_equipment"],
  },
  {
    name: "EVENT_RENTALS",
    subcategories: [
      "decoration_items",
      "tents_chairs",
      "lighting",
      "sound_systems",
    ],
  },
  {
    name: "SERVICES",
    subcategories: [
      "home_renovation_repair",
      "cleaning_pest_control",
      "packers_movers",
      "legal_documentation",
      "electronics_repair",
    ],
  },
];

module.exports = {
  ROLES,
  ITEM_CATEGORIES,
  ITEM_STATUSES,
};
