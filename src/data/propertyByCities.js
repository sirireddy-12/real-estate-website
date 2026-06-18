import listings from "@/utilis/listingHelpers";

const CITY_CONFIG = [
  { name: "Melbourne", image: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=600&q=80", tokens: ["melbourne"] },
  { name: "Perth",     image: "https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=600&q=80", tokens: ["perth", "subiaco", "scarborough", "wembley downs", "nedlands", "como", "margaret river", "baldivis", "broome", "rockingham", "gosnells", "caversham"] },
  { name: "Brisbane",  image: "https://images.unsplash.com/photo-1566734904496-9309bb1798ae?w=600&q=80", tokens: ["brisbane", "mcdowall", "ashgrove", "geebung", "inala", "bracken ridge", "mackenzie", "loganlea", "richlands", "reedy creek", "burpengary", "robina", "park ridge", "yarrabilba", "fig tree pocket", "blackstone", "idalia", "kawana island"] },
  { name: "Hobart",    image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=600&q=80", tokens: ["hobart", "battery point", "mount stuart", "kettering", "devonport", "riverside", "newstead", "lawitta", "newnham", "whitemark", "bridgenorth", "somerset", "swansea", "orford"] },
  { name: "Darwin",    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", tokens: ["darwin", "larrakeyah", "tiwi", "nightcliff", "casuarina", "muirhead", "moulden", "gunn", "farrar", "blackmore", "durack", "rosebery", "bellamack", "lyons", "woodroffe", "noonamah", "howard springs", "stuart park", "katherine", "gillen"] },
  { name: "Adelaide",  image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=600&q=80", tokens: ["adelaide", "unley park", "sheidow park", "plympton", "hillbank", "port pirie", "nairne", "mount barker", "munno para", "roxby downs", "berri", "mannum", "waitpinga", "moonta", "glossop", "port lincoln"] },
];

const cities = CITY_CONFIG.map((cfg, idx) => {
  const matched = listings.filter((l) => {
    const haystack = ((l.Address || "") + " " + (l.Suburb || "")).toLowerCase();
    return cfg.tokens.some((t) => haystack.includes(t));
  });
  return { id: idx + 1, name: cfg.name, image: cfg.image, propertyCount: matched.length };
});

export default cities;
