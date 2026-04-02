/**
 * Product Data Service
 * Manages fragrance products for men and women
 */

export interface Product {
  id: string;
  name: string;
  gender: 'men' | 'women';
  price: string;
  notes: string[];
  intensity: 1 | 2 | 3 | 4 | 5;
  description: string;
  image: string; // relative path to public/assets/
}

// Men's Fragrances
const menFragrances: Product[] = [
  { id: 'b1', name: 'Midnight Enigma', gender: 'men', price: '$119', notes: ['Woody', 'Amber', 'Musk'], intensity: 4, description: 'A mysterious blend of dark woods and warm amber', image: '/assets/MEN/B1.jpg' },
  { id: 'b10', name: 'Urban Edge', gender: 'men', price: '$95', notes: ['Fresh', 'Citrus', 'Spicy'], intensity: 3, description: 'Dynamic and energetic urban fragrance', image: '/assets/MEN/B10.jpg' },
  { id: 'b11', name: 'Ocean Horizon', gender: 'men', price: '$89', notes: ['Marine', 'Fresh', 'Citrus'], intensity: 2, description: 'Fresh sea breeze with coastal vibes', image: '/assets/MEN/B11.jpg' },
  { id: 'b12', name: 'Bronze Legacy', gender: 'men', price: '$125', notes: ['Oriental', 'Woody', 'Amber'], intensity: 5, description: 'Rich and powerful classic composition', image: '/assets/MEN/B12.jpg' },
  { id: 'b13', name: 'Alpine Storm', gender: 'men', price: '$105', notes: ['Aromatic', 'Herbal', 'Woody'], intensity: 4, description: 'Crisp mountain air with green herbaceous notes', image: '/assets/MEN/B13.jpg' },
  { id: 'b14', name: 'Neon Pulse', gender: 'men', price: '$99', notes: ['Fresh', 'Spicy', 'Aromatic'], intensity: 3, description: 'Modern and vibrant energy', image: '/assets/MEN/B14.jpg' },
  { id: 'b15', name: 'Leather Soul', gender: 'men', price: '$129', notes: ['Leather', 'Tobacco', 'Woody'], intensity: 5, description: 'Bold and rugged leather composition', image: '/assets/MEN/B15.jpg' },
  { id: 'b16', name: 'Silver Lining', gender: 'men', price: '$109', notes: ['Fresh', 'Metallic', 'Clean'], intensity: 2, description: 'Sleek and sophisticated clean scent', image: '/assets/MEN/B16.jpg' },
  { id: 'b17', name: 'Smoke & Fire', gender: 'men', price: '$119', notes: ['Smoky', 'Spicy', 'Woody'], intensity: 4, description: 'Intense and smoldering fragrance', image: '/assets/MEN/B17.jpg' },
  { id: 'b19', name: 'Velvet Night', gender: 'men', price: '$115', notes: ['Oriental', 'Vanilla', 'Musk'], intensity: 4, description: 'Luxurious and sensual evening scent', image: '/assets/MEN/B19.jpg' },
  { id: 'b2', name: 'Classic Gentleman', gender: 'men', price: '$85', notes: ['Aromatic', 'Woody', 'Citrus'], intensity: 3, description: 'Timeless refined masculine scent', image: '/assets/MEN/B2.jpg' },
  { id: 'b20', name: 'Desert Mirage', gender: 'men', price: '$99', notes: ['Oriental', 'Amber', 'Spicy'], intensity: 3, description: 'Warm and exotic desert-inspired blend', image: '/assets/MEN/B20.jpg' },
  { id: 'b21', name: 'Steel Warrior', gender: 'men', price: '$115', notes: ['Aromatic', 'Woody', 'Metallic'], intensity: 4, description: 'Strong and confident powerful scent', image: '/assets/MEN/B21.jpg' },
  { id: 'b22', name: 'Tropical Escape', gender: 'men', price: '$89', notes: ['Fruity', 'Fresh', 'Woody'], intensity: 2, description: 'Light fruity escape to paradise', image: '/assets/MEN/B22.jpg' },
  { id: 'b23', name: 'Dark Matter', gender: 'men', price: '$125', notes: ['Woody', 'Patchouli', 'Musk'], intensity: 5, description: 'Deep and intense dark fragrance', image: '/assets/MEN/B23.jpg' },
  { id: 'b24', name: 'Coastal Breeze', gender: 'men', price: '$79', notes: ['Marine', 'Fresh', 'Citrus'], intensity: 2, description: 'Refreshing seaside atmosphere', image: '/assets/MEN/B24.jpg' },
  { id: 'b25', name: 'Golden Hour', gender: 'men', price: '$105', notes: ['Amber', 'Woody', 'Warm'], intensity: 3, description: 'Warm golden sunset captured in a bottle', image: '/assets/MEN/B25.jpg' },
  { id: 'b26', name: 'Storm Chaser', gender: 'men', price: '$109', notes: ['Aromatic', 'Ozonic', 'Fresh'], intensity: 3, description: 'Dynamic and electrifying scent', image: '/assets/MEN/B26.jpg' },
  { id: 'b27', name: 'Ivory Tower', gender: 'men', price: '$119', notes: ['Clean', 'Aromatic', 'Woody'], intensity: 3, description: 'Elegant and refined sophisticated blend', image: '/assets/MEN/B27.jpg' },
  { id: 'b28', name: 'Rebel Spirit', gender: 'men', price: '$99', notes: ['Spicy', 'Woody', 'Aromatic'], intensity: 4, description: 'Bold and rebellious attitude fragrance', image: '/assets/MEN/B28.jpg' },
  { id: 'b29', name: 'Fortune Seeker', gender: 'men', price: '$95', notes: ['Oriental', 'Amber', 'Woody'], intensity: 3, description: 'Ambitious and intriguing composition', image: '/assets/MEN/B29.jpg' },
  { id: 'b3', name: 'Deep Blue', gender: 'men', price: '$89', notes: ['Marine', 'Citrus', 'Fresh'], intensity: 2, description: 'Cool ocean-inspired freshness', image: '/assets/MEN/B3.jpg' },
  { id: 'b30', name: 'Apex Predator', gender: 'men', price: '$125', notes: ['Woody', 'Musk', 'Spicy'], intensity: 5, description: 'Predatory and intensely masculine', image: '/assets/MEN/B30.jpg' },
  { id: 'b31', name: 'Sunset Boulevard', gender: 'men', price: '$109', notes: ['Amber', 'Woody', 'Citrus'], intensity: 3, description: 'Hollywood glamour and sophistication', image: '/assets/MEN/B31.jpg' },
  { id: 'b32', name: 'Cyber Punk', gender: 'men', price: '$99', notes: ['Synthetic', 'Fresh', 'Aromatic'], intensity: 3, description: 'Futuristic and avant-garde scent', image: '/assets/MEN/B32.jpg' },
  { id: 'b33', name: 'Royal Decree', gender: 'men', price: '$135', notes: ['Oriental', 'Woody', 'Musk'], intensity: 4, description: 'Regal and commanding presence', image: '/assets/MEN/B33.jpg' },
  { id: 'b34', name: 'Silver Screen', gender: 'men', price: '$109', notes: ['Aromatic', 'Clean', 'Citrus'], intensity: 2, description: 'Bright and charming classic appeal', image: '/assets/MEN/B34.jpg' },
  { id: 'b35', name: 'Thunder Road', gender: 'men', price: '$115', notes: ['Woody', 'Spicy', 'Aromatic'], intensity: 4, description: 'Powerful and audacious bold scent', image: '/assets/MEN/B35.jpg' },
  { id: 'b36', name: 'Whispers', gender: 'men', price: '$85', notes: ['Soft', 'Musk', 'Woody'], intensity: 2, description: 'Subtle and intimate gentle fragrance', image: '/assets/MEN/B36.jpg' },
  { id: 'b37', name: 'Inferno', gender: 'men', price: '$119', notes: ['Spicy', 'Smoky', 'Woody'], intensity: 5, description: 'Burning passion in a bottle', image: '/assets/MEN/B37.jpg' },
  { id: 'b38', name: 'Frostbite', gender: 'men', price: '$99', notes: ['Fresh', 'Minty', 'Clean'], intensity: 2, description: 'Cool and crisp icy sensation', image: '/assets/MEN/B38.jpg' },
  { id: 'b39', name: 'Vegas Gold', gender: 'men', price: '$125', notes: ['Amber', 'Woody', 'Spicy'], intensity: 4, description: 'Luxurious and glamorous glittering scent', image: '/assets/MEN/B39.jpg' },
  { id: 'b4', name: 'Spice Route', gender: 'men', price: '$99', notes: ['Spicy', 'Oriental', 'Woody'], intensity: 4, description: 'Exotic spices and warm woods', image: '/assets/MEN/B4.jpg' },
  { id: 'b40', name: 'Eclipse', gender: 'men', price: '$115', notes: ['Dark', 'Woody', 'Musk'], intensity: 4, description: 'Mysterious eclipse of light and dark', image: '/assets/MEN/B40.jpg' },
  { id: 'b41', name: 'Maverick', gender: 'men', price: '$105', notes: ['Fresh', 'Spicy', 'Woody'], intensity: 3, description: 'Independent and rule-breaking spirit', image: '/assets/MEN/B41.jpg' },
  { id: 'b42', name: 'Quantum Leap', gender: 'men', price: '$119', notes: ['Aromatic', 'Fresh', 'Synthetic'], intensity: 3, description: 'Advanced molecular fragrance structure', image: '/assets/MEN/B42.jpg' },
  { id: 'b43', name: 'Mojave', gender: 'men', price: '$99', notes: ['Woody', 'Spicy', 'Dry'], intensity: 3, description: 'Desert landscape aromatic composition', image: '/assets/MEN/B43.jpg' },
  { id: 'b44', name: 'Crimson Crown', gender: 'men', price: '$125', notes: ['Oriental', 'Amber', 'Woody'], intensity: 4, description: 'Commanding royal presence bold scent', image: '/assets/MEN/B44.jpg' },
  { id: 'b45', name: 'Phantom', gender: 'men', price: '$109', notes: ['Aromatic', 'Woody', 'Musk'], intensity: 3, description: 'Enigmatic and elusive mysterious scent', image: '/assets/MEN/B45.jpg' },
  { id: 'b5', name: 'Vetiver Noir', gender: 'men', price: '$115', notes: ['Woody', 'Vetiver', 'Patchouli'], intensity: 4, description: 'Dark woody aromatic depth', image: '/assets/MEN/B5.jpg' },
  { id: 'b6', name: 'Lemon Burst', gender: 'men', price: '$75', notes: ['Citrus', 'Fresh', 'Aromatic'], intensity: 2, description: 'Bright and zesty energetic scent', image: '/assets/MEN/B6.jpg' },
  { id: 'b7', name: 'Shadow Dance', gender: 'men', price: '$109', notes: ['Woody', 'Aromatic', 'Musk'], intensity: 3, description: 'Mysterious dance of light and shadow', image: '/assets/MEN/B7.jpg' },
  { id: 'b8', name: 'Platinum Rush', gender: 'men', price: '$129', notes: ['Metallic', 'Fresh', 'Woody'], intensity: 4, description: 'Sleek and modern precious metal scent', image: '/assets/MEN/B8.jpg' },
  { id: 'b9', name: 'Caramel Dreams', gender: 'men', price: '$85', notes: ['Sweet', 'Woody', 'Amber'], intensity: 2, description: 'Warm and comforting sweet composition', image: '/assets/MEN/B9.jpg' },
];

// Women's Fragrances
const womenFragrances: Product[] = [
  { id: 'g1', name: 'Rose Garden', gender: 'women', price: '$109', notes: ['Floral', 'Rose', 'Green'], intensity: 3, description: 'Timeless blooming rose gardens', image: '/assets/women/G1.jpg' },
  { id: 'g10', name: 'Desire', gender: 'women', price: '$119', notes: ['Amber', 'Musk', 'Woody'], intensity: 4, description: 'Sensual and captivating allure', image: '/assets/women/G10.jpg' },
  { id: 'g11', name: 'Celestial', gender: 'women', price: '$115', notes: ['Floral', 'White Flowers', 'Musk'], intensity: 3, description: 'Heavenly and ethereal scent', image: '/assets/women/G11.jpg' },
  { id: 'g12', name: 'Velvet Petals', gender: 'women', price: '$125', notes: ['Floral', 'Soft', 'Amber'], intensity: 3, description: 'Soft and luxurious petal texture', image: '/assets/women/G12.jpg' },
  { id: 'g13', name: 'Berry Bliss', gender: 'women', price: '$89', notes: ['Fruity', 'Floral', 'Sweet'], intensity: 2, description: 'Sweet berry medley fragrance', image: '/assets/women/G13.jpg' },
  { id: 'g14', name: 'Midnight Jasmine', gender: 'women', price: '$119', notes: ['Floral', 'Jasmine', 'Woody'], intensity: 4, description: 'Dark and intoxicating jasmine blooms', image: '/assets/women/G14.jpg' },
  { id: 'g15', name: 'Sunshine Gold', gender: 'women', price: '$99', notes: ['Fruity', 'Floral', 'Warm'], intensity: 2, description: 'Warm golden sun-kissed scent', image: '/assets/women/G15.jpg' },
  { id: 'g16', name: 'Lavender Dream', gender: 'women', price: '$85', notes: ['Floral', 'Herbal', 'Soft'], intensity: 2, description: 'Calming lavender fields fragrance', image: '/assets/women/G16.jpg' },
  { id: 'g17', name: 'Silk & Satin', gender: 'women', price: '$125', notes: ['Musk', 'Soft', 'Woody'], intensity: 3, description: 'Luxurious and silky smooth texture', image: '/assets/women/G17.jpg' },
  { id: 'g18', name: 'Ocean Pearl', gender: 'women', price: '$95', notes: ['Marine', 'Fresh', 'Citrus'], intensity: 2, description: 'Fresh as a pearl from the ocean', image: '/assets/women/G18.jpg' },
  { id: 'g19', name: 'Cherry Blossom', gender: 'women', price: '$99', notes: ['Floral', 'Fruity', 'Delicate'], intensity: 2, description: 'Delicate cherry blossom petals', image: '/assets/women/G19.jpg' },
  { id: 'g2', name: 'Peach Nectar', gender: 'women', price: '$89', notes: ['Fruity', 'Sweet', 'Floral'], intensity: 2, description: 'Sweet and juicy peach fragrance', image: '/assets/women/G2.jpg' },
  { id: 'g20', name: 'Enchantment', gender: 'women', price: '$129', notes: ['Floral', 'Amber', 'Musk'], intensity: 4, description: 'Magical and bewitching composition', image: '/assets/women/G20.jpg' },
  { id: 'g21', name: 'Dewdrop', gender: 'women', price: '$85', notes: ['Fresh', 'Citrus', 'Floral'], intensity: 2, description: 'Fresh morning dewdrop sparkle', image: '/assets/women/G21.jpg' },
  { id: 'g22', name: 'Crimson Kiss', gender: 'women', price: '$119', notes: ['Floral', 'Red Fruits', 'Woody'], intensity: 4, description: 'Bold and passionate kiss fragrance', image: '/assets/women/G22.jpg' },
  { id: 'g23', name: 'Moonlight Iris', gender: 'women', price: '$125', notes: ['Floral', 'Iris', 'Musk'], intensity: 3, description: 'Ethereal iris under moonlight', image: '/assets/women/G23.jpg' },
  { id: 'g24', name: 'Tropical Paradise', gender: 'women', price: '$99', notes: ['Fruity', 'Fresh', 'Floral'], intensity: 2, description: 'Exotic tropical paradise escape', image: '/assets/women/G24.jpg' },
  { id: 'g25', name: 'Vanilla Swirl', gender: 'women', price: '$89', notes: ['Vanilla', 'Sweet', 'Woody'], intensity: 2, description: 'Creamy vanilla sweetness', image: '/assets/women/G25.jpg' },
  { id: 'g26', name: 'Magnolia Elegance', gender: 'women', price: '$115', notes: ['Floral', 'Magnolia', 'Clean'], intensity: 3, description: 'Elegant magnolia flower bouquet', image: '/assets/women/G26.jpg' },
  { id: 'g27', name: 'Starlight', gender: 'women', price: '$109', notes: ['Floral', 'Sparkly', 'Musk'], intensity: 3, description: 'Shimmering starlight essence', image: '/assets/women/G27.jpg' },
  { id: 'g28', name: 'Amber Sunset', gender: 'women', price: '$115', notes: ['Amber', 'Woody', 'Warm'], intensity: 3, description: 'Warm amber sunset glow', image: '/assets/women/G28.jpg' },
  { id: 'g29', name: 'White Orchid', gender: 'women', price: '$125', notes: ['Floral', 'White Flowers', 'Green'], intensity: 3, description: 'Exotic white orchid elegance', image: '/assets/women/G29.jpg' },
  { id: 'g3', name: 'Lilac Mist', gender: 'women', price: '$95', notes: ['Floral', 'Lilac', 'Soft'], intensity: 2, description: 'Delicate lilac mist fragrance', image: '/assets/women/G3.jpg' },
  { id: 'g30', name: 'Pomegranate Passion', gender: 'women', price: '$99', notes: ['Fruity', 'Spicy', 'Floral'], intensity: 3, description: 'Passionate pomegranate composition', image: '/assets/women/G30.jpg' },
  { id: 'g31', name: 'Serenity', gender: 'women', price: '$109', notes: ['Floral', 'Soft', 'Musk'], intensity: 2, description: 'Peaceful and calming serenity', image: '/assets/women/G31.jpg' },
  { id: 'g32', name: 'Diamond Dust', gender: 'women', price: '$129', notes: ['Sparkling', 'Citrus', 'Musk'], intensity: 3, description: 'Glittering like diamond sparkles', image: '/assets/women/G32.jpg' },
  { id: 'g33', name: 'Romance', gender: 'women', price: '$119', notes: ['Floral', 'Rose', 'Musk'], intensity: 3, description: 'Romantic and affectionate scent', image: '/assets/women/G33.jpg' },
  { id: 'g34', name: 'Vanilla Bloom', gender: 'women', price: '$99', notes: ['Vanilla', 'Floral', 'Sweet'], intensity: 2, description: 'Soft vanilla blossom mix', image: '/assets/women/G34.jpg' },
  { id: 'g35', name: 'Garden Secret', gender: 'women', price: '$109', notes: ['Floral', 'Green', 'Woody'], intensity: 3, description: 'Hidden garden secret fragrance', image: '/assets/women/G35.jpg' },
  { id: 'g36', name: 'Crystal Waters', gender: 'women', price: '$95', notes: ['Fresh', 'Aquatic', 'Clean'], intensity: 2, description: 'Pure crystal clear water scent', image: '/assets/women/G36.jpg' },
  { id: 'g37', name: 'Camellia', gender: 'women', price: '$119', notes: ['Floral', 'Camellia', 'Creamy'], intensity: 3, description: 'Exotic camellia flower perfection', image: '/assets/women/G37.jpg' },
  { id: 'g38', name: 'Sunset Romance', gender: 'women', price: '$115', notes: ['Floral', 'Warm', 'Woody'], intensity: 3, description: 'Romantic sunset moment captured', image: '/assets/women/G38.jpg' },
  { id: 'g39', name: 'Honey Glow', gender: 'women', price: '$99', notes: ['Amber', 'Sweet', 'Floral'], intensity: 2, description: 'Golden honey warmth and sweetness', image: '/assets/women/G39.jpg' },
  { id: 'g4', name: 'Tulip Spring', gender: 'women', price: '$89', notes: ['Floral', 'Fresh', 'Green'], intensity: 2, description: 'Fresh spring tulip garden', image: '/assets/women/G4.jpg' },
  { id: 'g40', name: 'Sapphire Dreams', gender: 'women', price: '$125', notes: ['Fruity', 'Floral', 'Woody'], intensity: 3, description: 'Deep blue sapphire dream state', image: '/assets/women/G40.jpg' },
  { id: 'g41', name: 'Silk Veil', gender: 'women', price: '$109', notes: ['Soft', 'Musk', 'Floral'], intensity: 2, description: 'Delicate silk veil softness', image: '/assets/women/G41.jpg' },
  { id: 'g42', name: 'Gardenia Bloom', gender: 'women', price: '$119', notes: ['Floral', 'Gardenia', 'Creamy'], intensity: 3, description: 'Intoxicating gardenia blooms', image: '/assets/women/G42.jpg' },
  { id: 'g43', name: 'Coconut Paradise', gender: 'women', price: '$89', notes: ['Fruity', 'Coconut', 'Creamy'], intensity: 2, description: 'Tropical coconut paradise feel', image: '/assets/women/G43.jpg' },
  { id: 'g44', name: 'Burgundy Nights', gender: 'women', price: '$125', notes: ['Floral', 'Fruity', 'Deep'], intensity: 4, description: 'Deep burgundy nights sensuality', image: '/assets/women/G44.jpg' },
  { id: 'g45', name: 'Mystic Sage', gender: 'women', price: '$109', notes: ['Herbal', 'Green', 'Soft'], intensity: 2, description: 'Mystical sage herbal blend', image: '/assets/women/G45.jpg' },
  { id: 'g46', name: 'Violet Wonder', gender: 'women', price: '$99', notes: ['Floral', 'Violet', 'Sweet'], intensity: 2, description: 'Sweet curious violet wonder', image: '/assets/women/G46.jpg' },
  { id: 'g47', name: 'Honey & Rose', gender: 'women', price: '$115', notes: ['Floral', 'Honey', 'Amber'], intensity: 3, description: 'Honey-sweetened rose composition', image: '/assets/women/G47.jpg' },
  { id: 'g48', name: 'Mystique', gender: 'women', price: '$125', notes: ['Floral', 'Amber', 'Warm'], intensity: 4, description: 'Mysterious and intriguing allure', image: '/assets/women/G48.jpg' },
  { id: 'g49', name: 'Petal Soft', gender: 'women', price: '$95', notes: ['Floral', 'Soft', 'Sweet'], intensity: 2, description: 'Ultra soft petal tenderness', image: '/assets/women/G49.jpg' },
  { id: 'g5', name: 'Honeysuckle', gender: 'women', price: '$99', notes: ['Floral', 'Sweet', 'Delicate'], intensity: 2, description: 'Delicate honeysuckle bloom', image: '/assets/women/G5.jpg' },
  { id: 'g50', name: 'Peachy Keen', gender: 'women', price: '$89', notes: ['Fruity', 'Floral', 'Warm'], intensity: 2, description: 'Fresh peachy keen vibe', image: '/assets/women/G50.jpg' },
  { id: 'g51', name: 'Velvet Rose', gender: 'women', price: '$119', notes: ['Floral', 'Rose', 'Soft'], intensity: 3, description: 'Luxuriously soft velvet rose', image: '/assets/women/G51.jpg' },
  { id: 'g52', name: 'Cherry Dream', gender: 'women', price: '$95', notes: ['Fruity', 'Sweet', 'Floral'], intensity: 2, description: 'Sweet cherry dream flavor', image: '/assets/women/G52.jpg' },
  { id: 'g53', name: 'Amber Light', gender: 'women', price: '$109', notes: ['Amber', 'Warm', 'Soft'], intensity: 2, description: 'Warm soft amber light glow', image: '/assets/women/G53.jpg' },
  { id: 'g54', name: 'Peony Spirit', gender: 'women', price: '$119', notes: ['Floral', 'Peony', 'Green'], intensity: 3, description: 'Blooming peony spirit essence', image: '/assets/women/G54.jpg' },
  { id: 'g55', name: 'Tuberose Kiss', gender: 'women', price: '$125', notes: ['Floral', 'Tuberose', 'Creamy'], intensity: 4, description: 'Intoxicating tuberose kiss', image: '/assets/women/G55.jpg' },
  { id: 'g56', name: 'Sugar Spice', gender: 'women', price: '$99', notes: ['Sweet', 'Spicy', 'Floral'], intensity: 2, description: 'Sweet spice aromatic blend', image: '/assets/women/G56.jpg' },
  { id: 'g57', name: 'Moonflower', gender: 'women', price: '$115', notes: ['Floral', 'Night Blooming', 'Soft'], intensity: 3, description: 'Rare moonflower night bloom', image: '/assets/women/G57.jpg' },
  { id: 'g58', name: 'Rainbow Dreams', gender: 'women', price: '$109', notes: ['Fruity', 'Colorful', 'Sweet'], intensity: 2, description: 'Vibrant rainbow dream state', image: '/assets/women/G58.jpg' },
  { id: 'g59', name: 'Passion Fruit', gender: 'women', price: '$99', notes: ['Fruity', 'Tropical', 'Floral'], intensity: 3, description: 'Juicy passion fruit explosion', image: '/assets/women/G59.jpg' },
  { id: 'g6', name: 'Lily Pad', gender: 'women', price: '$89', notes: ['Floral', 'Aquatic', 'Green'], intensity: 2, description: 'Serene lily pad tranquility', image: '/assets/women/G6.jpg' },
  { id: 'g60', name: 'Pure Essence', gender: 'women', price: '$125', notes: ['Floral', 'Clean', 'Soft'], intensity: 2, description: 'Pure distilled fragrance essence', image: '/assets/women/G60.jpg' },
  { id: 'g61', name: 'Exotic Blend', gender: 'women', price: '$129', notes: ['Fruity', 'Floral', 'Spicy'], intensity: 3, description: 'Exotically blended composition', image: '/assets/women/G61.jpg' },
  { id: 'g7', name: 'Vanilla Orchid', gender: 'women', price: '$105', notes: ['Floral', 'Vanilla', 'Creamy'], intensity: 3, description: 'Creamy vanilla and orchid blend', image: '/assets/women/G7.jpg' },
  { id: 'g8', name: 'Midnight Musk', gender: 'women', price: '$115', notes: ['Musk', 'Floral', 'Woody'], intensity: 3, description: 'Sensual midnight musk fragrance', image: '/assets/women/G8.jpg' },
  { id: 'g9', name: 'Citrus Dream', gender: 'women', price: '$85', notes: ['Citrus', 'Fresh', 'Floral'], intensity: 2, description: 'Bright citrus dream fragrance', image: '/assets/women/G9.jpg' },
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
      const price = parseInt(product.price.replace('$', ''));
      if (price < filters.minPrice) return false;
    }

    if (filters.maxPrice !== undefined) {
      const price = parseInt(product.price.replace('$', ''));
      if (price > filters.maxPrice) return false;
    }

    if (filters.intensity && filters.intensity.length > 0) {
      if (!filters.intensity.includes(product.intensity)) return false;
    }

    return true;
  });
}
