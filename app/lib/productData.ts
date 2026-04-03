/**
 * Product Data Service
 * Manages fragrance products for men and women with variations
 */

export interface ProductVariation {
  id: string;
  oilPercent: 30 | 50 | 70;
  volume: '3ml' | '85ml';
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  gender: 'men' | 'women';
  basePrice: number;
  notes: string[];
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  image: string; // relative path to public/assets/
  variations?: ProductVariation[];
}

// Helper function to generate variations for a product
const generateVariations = (basePrice: number): ProductVariation[] => {
  const variations: ProductVariation[] = [];
  const sizes = ['3ml', '85ml'] as const;
  const oils = [30, 50, 70] as const;

  oils.forEach((oil) => {
    sizes.forEach((volume) => {
      const volumeMultiplier = volume === '3ml' ? 0.15 : 1;
      const oilMultiplier = 1 + (oil - 30) * 0.1; // 30% = 1x, 50% = 1.2x, 70% = 1.4x
      const varPrice = Math.round(basePrice * volumeMultiplier * oilMultiplier * 100) / 100;

      variations.push({
        id: `${oil}-${volume}`,
        oilPercent: oil as 30 | 50 | 70,
        volume,
        price: varPrice,
        stock: Math.floor(Math.random() * 50) + 10,
      });
    });
  });

  return variations;
};

// Men's Fragrances
const menFragrances: Product[] = [
  { id: 'b1', name: 'Midnight Enigma', gender: 'men', basePrice: 119, notes: ['Woody', 'Amber', 'Musk'], intensity: 4, description: 'A mysterious blend of dark woods and warm amber', image: '/assets/MEN/B1.jpg', variations: generateVariations(119) },
  { id: 'b10', name: 'Urban Edge', gender: 'men', basePrice: 95, notes: ['Fresh', 'Citrus', 'Spicy'], intensity: 3, description: 'Dynamic and energetic urban fragrance', image: '/assets/MEN/B10.jpg', variations: generateVariations(95) },
  { id: 'b11', name: 'Ocean Horizon', gender: 'men', basePrice: 89, notes: ['Marine', 'Fresh', 'Citrus'], intensity: 2, description: 'Fresh sea breeze with coastal vibes', image: '/assets/MEN/B11.jpg', variations: generateVariations(89) },
  { id: 'b12', name: 'Bronze Legacy', gender: 'men', basePrice: 125, notes: ['Oriental', 'Woody', 'Amber'], intensity: 5, description: 'Rich and powerful classic composition', image: '/assets/MEN/B12.jpg', variations: generateVariations(125) },
  { id: 'b13', name: 'Alpine Storm', gender: 'men', basePrice: 105, notes: ['Aromatic', 'Herbal', 'Woody'], intensity: 4, description: 'Crisp mountain air with green herbaceous notes', image: '/assets/MEN/B13.jpg', variations: generateVariations(105) },
  { id: 'b14', name: 'Neon Pulse', gender: 'men', basePrice: 99, notes: ['Fresh', 'Spicy', 'Aromatic'], intensity: 3, description: 'Modern and vibrant energy', image: '/assets/MEN/B14.jpg', variations: generateVariations(99) },
  { id: 'b15', name: 'Leather Soul', gender: 'men', basePrice: 129, notes: ['Leather', 'Tobacco', 'Woody'], intensity: 5, description: 'Bold and rugged leather composition', image: '/assets/MEN/B15.jpg', variations: generateVariations(129) },
  { id: 'b16', name: 'Silver Lining', gender: 'men', basePrice: 109, notes: ['Fresh', 'Metallic', 'Clean'], intensity: 2, description: 'Sleek and sophisticated clean scent', image: '/assets/MEN/B16.jpg', variations: generateVariations(109) },
  { id: 'b17', name: 'Smoke & Fire', gender: 'men', basePrice: 119, notes: ['Smoky', 'Spicy', 'Woody'], intensity: 4, description: 'Intense and smoldering fragrance', image: '/assets/MEN/B17.jpg', variations: generateVariations(119) },
  { id: 'b19', name: 'Velvet Night', gender: 'men', basePrice: 115, notes: ['Oriental', 'Vanilla', 'Musk'], intensity: 4, description: 'Luxurious and sensual evening scent', image: '/assets/MEN/B19.jpg', variations: generateVariations(115) },
  { id: 'b2', name: 'Classic Gentleman', gender: 'men', basePrice: 85, notes: ['Aromatic', 'Woody', 'Citrus'], intensity: 3, description: 'Timeless refined masculine scent', image: '/assets/MEN/B2.jpg', variations: generateVariations(85) },
  { id: 'b20', name: 'Desert Mirage', gender: 'men', basePrice: 99, notes: ['Oriental', 'Amber', 'Spicy'], intensity: 3, description: 'Warm and exotic desert-inspired blend', image: '/assets/MEN/B20.jpg', variations: generateVariations(99) },
  { id: 'b21', name: 'Steel Warrior', gender: 'men', basePrice: 115, notes: ['Aromatic', 'Woody', 'Metallic'], intensity: 4, description: 'Strong and confident powerful scent', image: '/assets/MEN/B21.jpg', variations: generateVariations(115) },
  { id: 'b22', name: 'Tropical Escape', gender: 'men', basePrice: 89, notes: ['Fruity', 'Fresh', 'Woody'], intensity: 2, description: 'Light fruity escape to paradise', image: '/assets/MEN/B22.jpg', variations: generateVariations(89) },
  { id: 'b23', name: 'Dark Matter', gender: 'men', basePrice: 125, notes: ['Woody', 'Patchouli', 'Musk'], intensity: 5, description: 'Deep and intense dark fragrance', image: '/assets/MEN/B23.jpg', variations: generateVariations(125) },
  { id: 'b24', name: 'Coastal Breeze', gender: 'men', basePrice: 79, notes: ['Marine', 'Fresh', 'Citrus'], intensity: 2, description: 'Refreshing seaside atmosphere', image: '/assets/MEN/B24.jpg', variations: generateVariations(79) },
  { id: 'b25', name: 'Golden Hour', gender: 'men', basePrice: 105, notes: ['Amber', 'Woody', 'Warm'], intensity: 3, description: 'Warm golden sunset captured in a bottle', image: '/assets/MEN/B25.jpg', variations: generateVariations(105) },
  { id: 'b26', name: 'Storm Chaser', gender: 'men', basePrice: 109, notes: ['Aromatic', 'Ozonic', 'Fresh'], intensity: 3, description: 'Dynamic and electrifying scent', image: '/assets/MEN/B26.jpg', variations: generateVariations(109) },
  { id: 'b27', name: 'Ivory Tower', gender: 'men', basePrice: 119, notes: ['Clean', 'Aromatic', 'Woody'], intensity: 3, description: 'Elegant and refined sophisticated blend', image: '/assets/MEN/B27.jpg', variations: generateVariations(119) },
  { id: 'b28', name: 'Rebel Spirit', gender: 'men', basePrice: 99, notes: ['Spicy', 'Woody', 'Aromatic'], intensity: 4, description: 'Bold and rebellious attitude fragrance', image: '/assets/MEN/B28.jpg', variations: generateVariations(99) },
  { id: 'b29', name: 'Fortune Seeker', gender: 'men', basePrice: 95, notes: ['Oriental', 'Amber', 'Woody'], intensity: 3, description: 'Ambitious and intriguing composition', image: '/assets/MEN/B29.jpg', variations: generateVariations(95) },
  { id: 'b3', name: 'Deep Blue', gender: 'men', basePrice: 89, notes: ['Marine', 'Citrus', 'Fresh'], intensity: 2, description: 'Cool ocean-inspired freshness', image: '/assets/MEN/B3.jpg', variations: generateVariations(89) },
  { id: 'b30', name: 'Apex Predator', gender: 'men', basePrice: 125, notes: ['Woody', 'Musk', 'Spicy'], intensity: 5, description: 'Predatory and intensely masculine', image: '/assets/MEN/B30.jpg', variations: generateVariations(125) },
  { id: 'b31', name: 'Sunset Boulevard', gender: 'men', basePrice: 109, notes: ['Amber', 'Woody', 'Citrus'], intensity: 3, description: 'Hollywood glamour and sophistication', image: '/assets/MEN/B31.jpg', variations: generateVariations(109) },
  { id: 'b32', name: 'Cyber Punk', gender: 'men', basePrice: 99, notes: ['Synthetic', 'Fresh', 'Aromatic'], intensity: 3, description: 'Futuristic and avant-garde scent', image: '/assets/MEN/B32.jpg', variations: generateVariations(99) },
  { id: 'b33', name: 'Royal Decree', gender: 'men', basePrice: 135, notes: ['Oriental', 'Woody', 'Musk'], intensity: 4, description: 'Regal and commanding presence', image: '/assets/MEN/B33.jpg', variations: generateVariations(135) },
  { id: 'b34', name: 'Silver Screen', gender: 'men', basePrice: 109, notes: ['Aromatic', 'Clean', 'Citrus'], intensity: 2, description: 'Bright and charming classic appeal', image: '/assets/MEN/B34.jpg', variations: generateVariations(109) },
  { id: 'b35', name: 'Thunder Road', gender: 'men', basePrice: 115, notes: ['Woody', 'Spicy', 'Aromatic'], intensity: 4, description: 'Powerful and audacious bold scent', image: '/assets/MEN/B35.jpg', variations: generateVariations(115) },
  { id: 'b36', name: 'Whispers', gender: 'men', basePrice: 85, notes: ['Soft', 'Musk', 'Woody'], intensity: 2, description: 'Subtle and intimate gentle fragrance', image: '/assets/MEN/B36.jpg', variations: generateVariations(85) },
  { id: 'b37', name: 'Inferno', gender: 'men', basePrice: 119, notes: ['Spicy', 'Smoky', 'Woody'], intensity: 5, description: 'Burning passion in a bottle', image: '/assets/MEN/B37.jpg', variations: generateVariations(119) },
  { id: 'b38', name: 'Frostbite', gender: 'men', basePrice: 99, notes: ['Fresh', 'Minty', 'Clean'], intensity: 2, description: 'Cool and crisp icy sensation', image: '/assets/MEN/B38.jpg', variations: generateVariations(99) },
  { id: 'b39', name: 'Vegas Gold', gender: 'men', basePrice: 125, notes: ['Amber', 'Woody', 'Spicy'], intensity: 4, description: 'Luxurious and glamorous glittering scent', image: '/assets/MEN/B39.jpg', variations: generateVariations(125) },
  { id: 'b4', name: 'Spice Route', gender: 'men', basePrice: 99, notes: ['Spicy', 'Oriental', 'Woody'], intensity: 4, description: 'Exotic spices and warm woods', image: '/assets/MEN/B4.jpg', variations: generateVariations(99) },
  { id: 'b40', name: 'Eclipse', gender: 'men', basePrice: 115, notes: ['Dark', 'Woody', 'Musk'], intensity: 4, description: 'Mysterious eclipse of light and dark', image: '/assets/MEN/B40.jpg', variations: generateVariations(115) },
  { id: 'b41', name: 'Maverick', gender: 'men', basePrice: 105, notes: ['Fresh', 'Spicy', 'Woody'], intensity: 3, description: 'Independent and rule-breaking spirit', image: '/assets/MEN/B41.jpg', variations: generateVariations(105) },
  { id: 'b42', name: 'Quantum Leap', gender: 'men', basePrice: 119, notes: ['Aromatic', 'Fresh', 'Synthetic'], intensity: 3, description: 'Advanced molecular fragrance structure', image: '/assets/MEN/B42.jpg', variations: generateVariations(119) },
  { id: 'b43', name: 'Mojave', gender: 'men', basePrice: 99, notes: ['Woody', 'Spicy', 'Dry'], intensity: 3, description: 'Desert landscape aromatic composition', image: '/assets/MEN/B43.jpg', variations: generateVariations(99) },
  { id: 'b44', name: 'Crimson Crown', gender: 'men', basePrice: 125, notes: ['Oriental', 'Amber', 'Woody'], intensity: 4, description: 'Commanding royal presence bold scent', image: '/assets/MEN/B44.jpg', variations: generateVariations(125) },
  { id: 'b45', name: 'Phantom', gender: 'men', basePrice: 109, notes: ['Aromatic', 'Woody', 'Musk'], intensity: 3, description: 'Enigmatic and elusive mysterious scent', image: '/assets/MEN/B45.jpg', variations: generateVariations(109) },
  { id: 'b5', name: 'Vetiver Noir', gender: 'men', basePrice: 115, notes: ['Woody', 'Vetiver', 'Patchouli'], intensity: 4, description: 'Dark woody aromatic depth', image: '/assets/MEN/B5.jpg', variations: generateVariations(115) },
  { id: 'b6', name: 'Lemon Burst', gender: 'men', basePrice: 75, notes: ['Citrus', 'Fresh', 'Aromatic'], intensity: 2, description: 'Bright and zesty energetic scent', image: '/assets/MEN/B6.jpg', variations: generateVariations(75) },
  { id: 'b7', name: 'Shadow Dance', gender: 'men', basePrice: 109, notes: ['Woody', 'Aromatic', 'Musk'], intensity: 3, description: 'Mysterious dance of light and shadow', image: '/assets/MEN/B7.jpg', variations: generateVariations(109) },
  { id: 'b8', name: 'Platinum Rush', gender: 'men', basePrice: 129, notes: ['Metallic', 'Fresh', 'Woody'], intensity: 4, description: 'Sleek and modern precious metal scent', image: '/assets/MEN/B8.jpg', variations: generateVariations(129) },
  { id: 'b9', name: 'Caramel Dreams', gender: 'men', basePrice: 85, notes: ['Sweet', 'Woody', 'Amber'], intensity: 2, description: 'Warm and comforting sweet composition', image: '/assets/MEN/B9.jpg', variations: generateVariations(85) },
];

// Women's Fragrances
const womenFragrances: Product[] = [
  { id: 'g1', name: 'Rose Garden', gender: 'women', basePrice: 109, notes: ['Floral', 'Rose', 'Green'], intensity: 3, description: 'Timeless blooming rose gardens', image: '/assets/women/G1.jpg', variations: generateVariations(109) },
  { id: 'g10', name: 'Desire', gender: 'women', basePrice: 119, notes: ['Amber', 'Musk', 'Woody'], intensity: 4, description: 'Sensual and captivating allure', image: '/assets/women/G10.jpg', variations: generateVariations(119) },
  { id: 'g11', name: 'Celestial', gender: 'women', basePrice: 115, notes: ['Floral', 'White Flowers', 'Musk'], intensity: 3, description: 'Heavenly and ethereal scent', image: '/assets/women/G11.jpg', variations: generateVariations(115) },
  { id: 'g12', name: 'Velvet Petals', gender: 'women', basePrice: 125, notes: ['Floral', 'Soft', 'Amber'], intensity: 3, description: 'Soft and luxurious petal texture', image: '/assets/women/G12.jpg', variations: generateVariations(125) },
  { id: 'g13', name: 'Berry Bliss', gender: 'women', basePrice: 89, notes: ['Fruity', 'Floral', 'Sweet'], intensity: 2, description: 'Sweet berry medley fragrance', image: '/assets/women/G13.jpg', variations: generateVariations(89) },
  { id: 'g14', name: 'Midnight Jasmine', gender: 'women', basePrice: 119, notes: ['Floral', 'Jasmine', 'Woody'], intensity: 4, description: 'Dark and intoxicating jasmine blooms', image: '/assets/women/G14.jpg', variations: generateVariations(119) },
  { id: 'g15', name: 'Sunshine Gold', gender: 'women', basePrice: 99, notes: ['Fruity', 'Floral', 'Warm'], intensity: 2, description: 'Warm golden sun-kissed scent', image: '/assets/women/G15.jpg', variations: generateVariations(99) },
  { id: 'g16', name: 'Lavender Dream', gender: 'women', basePrice: 85, notes: ['Floral', 'Herbal', 'Soft'], intensity: 2, description: 'Calming lavender fields fragrance', image: '/assets/women/G16.jpg', variations: generateVariations(85) },
  { id: 'g17', name: 'Silk & Satin', gender: 'women', basePrice: 125, notes: ['Musk', 'Soft', 'Woody'], intensity: 3, description: 'Luxurious and silky smooth texture', image: '/assets/women/G17.jpg', variations: generateVariations(125) },
  { id: 'g18', name: 'Ocean Pearl', gender: 'women', basePrice: 95, notes: ['Marine', 'Fresh', 'Citrus'], intensity: 2, description: 'Fresh as a pearl from the ocean', image: '/assets/women/G18.jpg', variations: generateVariations(95) },
  { id: 'g19', name: 'Cherry Blossom', gender: 'women', basePrice: 99, notes: ['Floral', 'Fruity', 'Delicate'], intensity: 2, description: 'Delicate cherry blossom petals', image: '/assets/women/G19.jpg', variations: generateVariations(99) },
  { id: 'g2', name: 'Peach Nectar', gender: 'women', basePrice: 89, notes: ['Fruity', 'Sweet', 'Floral'], intensity: 2, description: 'Sweet and juicy peach fragrance', image: '/assets/women/G2.jpg', variations: generateVariations(89) },
  { id: 'g20', name: 'Enchantment', gender: 'women', basePrice: 129, notes: ['Floral', 'Amber', 'Musk'], intensity: 4, description: 'Magical and bewitching composition', image: '/assets/women/G20.jpg', variations: generateVariations(129) },
  { id: 'g21', name: 'Dewdrop', gender: 'women', basePrice: 85, notes: ['Fresh', 'Citrus', 'Floral'], intensity: 2, description: 'Fresh morning dewdrop sparkle', image: '/assets/women/G21.jpg', variations: generateVariations(85) },
  { id: 'g22', name: 'Crimson Kiss', gender: 'women', basePrice: 119, notes: ['Floral', 'Red Fruits', 'Woody'], intensity: 4, description: 'Bold and passionate kiss fragrance', image: '/assets/women/G22.jpg', variations: generateVariations(119) },
  { id: 'g23', name: 'Moonlight Iris', gender: 'women', basePrice: 125, notes: ['Floral', 'Iris', 'Musk'], intensity: 3, description: 'Ethereal iris under moonlight', image: '/assets/women/G23.jpg', variations: generateVariations(125) },
  { id: 'g24', name: 'Tropical Paradise', gender: 'women', basePrice: 99, notes: ['Fruity', 'Fresh', 'Floral'], intensity: 2, description: 'Exotic tropical paradise escape', image: '/assets/women/G24.jpg', variations: generateVariations(99) },
  { id: 'g25', name: 'Vanilla Swirl', gender: 'women', basePrice: 89, notes: ['Vanilla', 'Sweet', 'Woody'], intensity: 2, description: 'Creamy vanilla sweetness', image: '/assets/women/G25.jpg', variations: generateVariations(89) },
  { id: 'g26', name: 'Magnolia Elegance', gender: 'women', basePrice: 115, notes: ['Floral', 'Magnolia', 'Clean'], intensity: 3, description: 'Elegant magnolia flower bouquet', image: '/assets/women/G26.jpg', variations: generateVariations(115) },
  { id: 'g27', name: 'Starlight', gender: 'women', basePrice: 109, notes: ['Floral', 'Sparkly', 'Musk'], intensity: 3, description: 'Shimmering starlight essence', image: '/assets/women/G27.jpg', variations: generateVariations(109) },
  { id: 'g28', name: 'Amber Sunset', gender: 'women', basePrice: 115, notes: ['Amber', 'Woody', 'Warm'], intensity: 3, description: 'Warm amber sunset glow', image: '/assets/women/G28.jpg', variations: generateVariations(115) },
  { id: 'g29', name: 'White Orchid', gender: 'women', basePrice: 125, notes: ['Floral', 'White Flowers', 'Green'], intensity: 3, description: 'Exotic white orchid elegance', image: '/assets/women/G29.jpg', variations: generateVariations(125) },
  { id: 'g3', name: 'Lilac Mist', gender: 'women', basePrice: 95, notes: ['Floral', 'Lilac', 'Soft'], intensity: 2, description: 'Delicate lilac mist fragrance', image: '/assets/women/G3.jpg', variations: generateVariations(95) },
  { id: 'g30', name: 'Pomegranate Passion', gender: 'women', basePrice: 99, notes: ['Fruity', 'Spicy', 'Floral'], intensity: 3, description: 'Passionate pomegranate composition', image: '/assets/women/G30.jpg', variations: generateVariations(99) },
  { id: 'g31', name: 'Serenity', gender: 'women', basePrice: 109, notes: ['Floral', 'Soft', 'Musk'], intensity: 2, description: 'Peaceful and calming serenity', image: '/assets/women/G31.jpg', variations: generateVariations(109) },
  { id: 'g32', name: 'Diamond Dust', gender: 'women', basePrice: 129, notes: ['Sparkling', 'Citrus', 'Musk'], intensity: 3, description: 'Glittering like diamond sparkles', image: '/assets/women/G32.jpg', variations: generateVariations(129) },
  { id: 'g33', name: 'Romance', gender: 'women', basePrice: 119, notes: ['Floral', 'Rose', 'Musk'], intensity: 3, description: 'Romantic and affectionate scent', image: '/assets/women/G33.jpg', variations: generateVariations(119) },
  { id: 'g34', name: 'Vanilla Bloom', gender: 'women', basePrice: 99, notes: ['Vanilla', 'Floral', 'Sweet'], intensity: 2, description: 'Soft vanilla blossom mix', image: '/assets/women/G34.jpg', variations: generateVariations(99) },
  { id: 'g35', name: 'Garden Secret', gender: 'women', basePrice: 109, notes: ['Floral', 'Green', 'Woody'], intensity: 3, description: 'Hidden garden secret fragrance', image: '/assets/women/G35.jpg', variations: generateVariations(109) },
  { id: 'g36', name: 'Crystal Waters', gender: 'women', basePrice: 95, notes: ['Fresh', 'Aquatic', 'Clean'], intensity: 2, description: 'Pure crystal clear water scent', image: '/assets/women/G36.jpg', variations: generateVariations(95) },
  { id: 'g37', name: 'Camellia', gender: 'women', basePrice: 119, notes: ['Floral', 'Camellia', 'Creamy'], intensity: 3, description: 'Exotic camellia flower perfection', image: '/assets/women/G37.jpg', variations: generateVariations(119) },
  { id: 'g38', name: 'Sunset Romance', gender: 'women', basePrice: 115, notes: ['Floral', 'Warm', 'Woody'], intensity: 3, description: 'Romantic sunset moment captured', image: '/assets/women/G38.jpg', variations: generateVariations(115) },
  { id: 'g39', name: 'Honey Glow', gender: 'women', basePrice: 99, notes: ['Amber', 'Sweet', 'Floral'], intensity: 2, description: 'Golden honey warmth and sweetness', image: '/assets/women/G39.jpg', variations: generateVariations(99) },
  { id: 'g4', name: 'Tulip Spring', gender: 'women', basePrice: 89, notes: ['Floral', 'Fresh', 'Green'], intensity: 2, description: 'Fresh spring tulip garden', image: '/assets/women/G4.jpg', variations: generateVariations(89) },
  { id: 'g40', name: 'Sapphire Dreams', gender: 'women', basePrice: 125, notes: ['Fruity', 'Floral', 'Woody'], intensity: 3, description: 'Deep blue sapphire dream state', image: '/assets/women/G40.jpg', variations: generateVariations(125) },
  { id: 'g41', name: 'Silk Veil', gender: 'women', basePrice: 109, notes: ['Soft', 'Musk', 'Floral'], intensity: 2, description: 'Delicate silk veil softness', image: '/assets/women/G41.jpg', variations: generateVariations(109) },
  { id: 'g42', name: 'Gardenia Bloom', gender: 'women', basePrice: 119, notes: ['Floral', 'Gardenia', 'Creamy'], intensity: 3, description: 'Intoxicating gardenia blooms', image: '/assets/women/G42.jpg', variations: generateVariations(119) },
  { id: 'g43', name: 'Coconut Paradise', gender: 'women', basePrice: 89, notes: ['Fruity', 'Coconut', 'Creamy'], intensity: 2, description: 'Tropical coconut paradise feel', image: '/assets/women/G43.jpg', variations: generateVariations(89) },
  { id: 'g44', name: 'Burgundy Nights', gender: 'women', basePrice: 125, notes: ['Floral', 'Fruity', 'Deep'], intensity: 4, description: 'Deep burgundy nights sensuality', image: '/assets/women/G44.jpg', variations: generateVariations(125) },
  { id: 'g45', name: 'Mystic Sage', gender: 'women', basePrice: 109, notes: ['Herbal', 'Green', 'Soft'], intensity: 2, description: 'Mystical sage herbal blend', image: '/assets/women/G45.jpg', variations: generateVariations(109) },
  { id: 'g46', name: 'Violet Wonder', gender: 'women', basePrice: 99, notes: ['Floral', 'Violet', 'Sweet'], intensity: 2, description: 'Sweet curious violet wonder', image: '/assets/women/G46.jpg', variations: generateVariations(99) },
  { id: 'g47', name: 'Honey & Rose', gender: 'women', basePrice: 115, notes: ['Floral', 'Honey', 'Amber'], intensity: 3, description: 'Honey-sweetened rose composition', image: '/assets/women/G47.jpg', variations: generateVariations(115) },
  { id: 'g48', name: 'Mystique', gender: 'women', basePrice: 125, notes: ['Floral', 'Amber', 'Warm'], intensity: 4, description: 'Mysterious and intriguing allure', image: '/assets/women/G48.jpg', variations: generateVariations(125) },
  { id: 'g49', name: 'Petal Soft', gender: 'women', basePrice: 95, notes: ['Floral', 'Soft', 'Sweet'], intensity: 2, description: 'Ultra soft petal tenderness', image: '/assets/women/G49.jpg', variations: generateVariations(95) },
  { id: 'g5', name: 'Honeysuckle', gender: 'women', basePrice: 99, notes: ['Floral', 'Sweet', 'Delicate'], intensity: 2, description: 'Delicate honeysuckle bloom', image: '/assets/women/G5.jpg', variations: generateVariations(99) },
  { id: 'g50', name: 'Peachy Keen', gender: 'women', basePrice: 89, notes: ['Fruity', 'Floral', 'Warm'], intensity: 2, description: 'Fresh peachy keen vibe', image: '/assets/women/G50.jpg', variations: generateVariations(89) },
  { id: 'g51', name: 'Velvet Rose', gender: 'women', basePrice: 119, notes: ['Floral', 'Rose', 'Soft'], intensity: 3, description: 'Luxuriously soft velvet rose', image: '/assets/women/G51.jpg', variations: generateVariations(119) },
  { id: 'g52', name: 'Cherry Dream', gender: 'women', basePrice: 95, notes: ['Fruity', 'Sweet', 'Floral'], intensity: 2, description: 'Sweet cherry dream flavor', image: '/assets/women/G52.jpg', variations: generateVariations(95) },
  { id: 'g53', name: 'Amber Light', gender: 'women', basePrice: 109, notes: ['Amber', 'Warm', 'Soft'], intensity: 2, description: 'Warm soft amber light glow', image: '/assets/women/G53.jpg', variations: generateVariations(109) },
  { id: 'g54', name: 'Peony Spirit', gender: 'women', basePrice: 119, notes: ['Floral', 'Peony', 'Green'], intensity: 3, description: 'Blooming peony spirit essence', image: '/assets/women/G54.jpg', variations: generateVariations(119) },
  { id: 'g55', name: 'Tuberose Kiss', gender: 'women', basePrice: 125, notes: ['Floral', 'Tuberose', 'Creamy'], intensity: 4, description: 'Intoxicating tuberose kiss', image: '/assets/women/G55.jpg', variations: generateVariations(125) },
  { id: 'g56', name: 'Sugar Spice', gender: 'women', basePrice: 99, notes: ['Sweet', 'Spicy', 'Floral'], intensity: 2, description: 'Sweet spice aromatic blend', image: '/assets/women/G56.jpg', variations: generateVariations(99) },
  { id: 'g57', name: 'Moonflower', gender: 'women', basePrice: 115, notes: ['Floral', 'Night Blooming', 'Soft'], intensity: 3, description: 'Rare moonflower night bloom', image: '/assets/women/G57.jpg', variations: generateVariations(115) },
  { id: 'g58', name: 'Rainbow Dreams', gender: 'women', basePrice: 109, notes: ['Fruity', 'Colorful', 'Sweet'], intensity: 2, description: 'Vibrant rainbow dream state', image: '/assets/women/G58.jpg', variations: generateVariations(109) },
  { id: 'g59', name: 'Passion Fruit', gender: 'women', basePrice: 99, notes: ['Fruity', 'Tropical', 'Floral'], intensity: 3, description: 'Juicy passion fruit explosion', image: '/assets/women/G59.jpg', variations: generateVariations(99) },
  { id: 'g6', name: 'Lily Pad', gender: 'women', basePrice: 89, notes: ['Floral', 'Aquatic', 'Green'], intensity: 2, description: 'Serene lily pad tranquility', image: '/assets/women/G6.jpg', variations: generateVariations(89) },
  { id: 'g60', name: 'Pure Essence', gender: 'women', basePrice: 125, notes: ['Floral', 'Clean', 'Soft'], intensity: 2, description: 'Pure distilled fragrance essence', image: '/assets/women/G60.jpg', variations: generateVariations(125) },
  { id: 'g61', name: 'Exotic Blend', gender: 'women', basePrice: 129, notes: ['Fruity', 'Floral', 'Spicy'], intensity: 3, description: 'Exotically blended composition', image: '/assets/women/G61.jpg', variations: generateVariations(129) },
  { id: 'g7', name: 'Vanilla Orchid', gender: 'women', basePrice: 105, notes: ['Floral', 'Vanilla', 'Creamy'], intensity: 3, description: 'Creamy vanilla and orchid blend', image: '/assets/women/G7.jpg', variations: generateVariations(105) },
  { id: 'g8', name: 'Midnight Musk', gender: 'women', basePrice: 115, notes: ['Musk', 'Floral', 'Woody'], intensity: 3, description: 'Sensual midnight musk fragrance', image: '/assets/women/G8.jpg', variations: generateVariations(115) },
  { id: 'g9', name: 'Citrus Dream', gender: 'women', basePrice: 85, notes: ['Citrus', 'Fresh', 'Floral'], intensity: 2, description: 'Bright citrus dream fragrance', image: '/assets/women/G9.jpg', variations: generateVariations(85) },
];

export const allProducts: Product[] = [...menFragrances, ...womenFragrances];

export function getProductsByGender(gender: 'men' | 'women' | 'all'): Product[] {
  if (gender === 'all') return allProducts;
  return allProducts.filter(p => p.gender === gender);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function filterProducts(
  products: Product[],
  filters: {
    notes?: string[];
    minPrice?: number;
    maxPrice?: number;
    intensity?: number[];
  }
): Product[] {
  return products.filter(product => {
    if (filters.notes && filters.notes.length > 0) {
      const hasMatchingNote = filters.notes.some(note =>
        product.notes.includes(note)
      );
      if (!hasMatchingNote) return false;
    }

    if (filters.minPrice !== undefined) {
      if (product.basePrice < filters.minPrice) return false;
    }

    if (filters.maxPrice !== undefined) {
      if (product.basePrice > filters.maxPrice) return false;
    }

    if (filters.intensity && filters.intensity.length > 0) {
      if (!filters.intensity.includes(product.intensity)) return false;
    }

    return true;
  });
}
