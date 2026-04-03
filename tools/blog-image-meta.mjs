/**
 * Blog list + inline figures for articles index 1–29 (index 0 = mono-PP in blog-article-bodies.mjs).
 * Images: storage/uploads/images/202511/{base}-1|2|3.png (generate via Cursor image tool or tools/download_blog_images.mjs).
 */
export const BLOG_IMAGE_PREFIX = "storage/uploads/images/202511";
export const BLOG_IMAGE_EXT = ".png";

/** @type {(null | { base: string, prompts: [string, string, string], figures: { alt: string, caption: string }[] })[]} */
export const BLOG_IMAGE_META = [
  null,
  {
    base: "airless-tube-bottle",
    prompts: [
      "Professional product photo, cosmetic airless pump soft tube beside cylindrical plastic airless bottle, white studio, skincare B2B catalog, photorealistic, no text",
      "Clean infographic style, side by side comparison travel-friendly airless tube versus rigid airless bottle for cream, simple icons, English labels, corporate flat design",
      "Technical cross-section diagram airless pump mechanism inside cosmetic tube versus bottle, engineering schematic, subtle colors, English callouts, white background",
    ],
    figures: [
      {
        alt: "Cosmetic airless pump tube and cylindrical airless bottle on a neutral studio background.",
        caption:
          "Airless systems limit oxygen and finger contact—format follows viscosity, evacuation, and filling-line constraints.",
      },
      {
        alt: "Comparison graphic of portable airless tube format versus classic airless bottle.",
        caption:
          "Tube-shaped airless packs fit travel and one-handed use when rheology and residuals are acceptable.",
      },
      {
        alt: "Schematic contrasting rigid airless bottle for dense creams with tube limitations.",
        caption:
          "High-viscosity fills and premium rigid silhouettes often stay with bottles and wider pump architectures.",
      },
    ],
  },
  {
    base: "pcr-cosmetic-tubes",
    prompts: [
      "Row of post-consumer recycled PE and PP cosmetic squeeze tubes in earth-tone plastics, recycling symbol motif subtle, studio lighting, no text, B2B packaging",
      "Infographic PCR percentage specification checklist for cosmetic tube RFQ, chain of custody icons, English, clean corporate",
      "Laboratory compatibility testing cosmetic fills on PCR plastic tubes, beakers and tubes, professional photo, no logos",
    ],
    figures: [
      {
        alt: "Post-consumer recycled plastic cosmetic squeeze tubes in assorted neutral tones.",
        caption:
          "PCR content helps scorecards but brings odor, color drift, and traceability work—treat resin as a qualified raw material.",
      },
      {
        alt: "Checklist-style visual for PCR percentage, color delta, and documentation in tube sourcing.",
        caption:
          "Quote-ready specs state PCR by weight, acceptable color shift, and whether chemical recycling content is allowed.",
      },
      {
        alt: "Cosmetic formula compatibility testing alongside PCR tube samples.",
        caption:
          "Fragrance, ethanol, and low-pH fills interact with PCR blends differently—test decoration adhesion too.",
      },
    ],
  },
  {
    base: "green-pe-tubes",
    prompts: [
      "Sugarcane-derived bio-based polyethylene cosmetic tubes with leaf motif texture subtle, renewable packaging story, studio white, photorealistic, no text",
      "Diagram renewable ethanol to ethylene to PE polymer pathway for green PE tubes, simple flowchart, English labels",
      "World map export logistics bio-based PE cosmetic tubes recyclability note, corporate infographic, English",
    ],
    figures: [
      {
        alt: "Bio-based polyethylene cosmetic squeeze tubes suggesting sugarcane-derived green PE.",
        caption:
          "Green PE behaves like fossil PE in many lines—claims should focus on biogenic carbon and LCA, not compostability.",
      },
      {
        alt: "Flowchart of renewable feedstock to polyethylene for cosmetic tubes.",
        caption:
          "Separate renewable feedstock claims from biodegradability; recyclability still follows local PE rules.",
      },
      {
        alt: "Export-oriented infographic on documenting biogenic content and retailer data feeds.",
        caption:
          "Align distributor language early—some markets sort bio-PE like conventional PE; others need distinct SKUs.",
      },
    ],
  },
  {
    base: "kraft-hybrid-tubes",
    prompts: [
      "Kraft paper look cosmetic laminate tubes on shelf, natural skincare branding, inner plastic barrier implied, studio, no text",
      "Humidity test cosmetic paper-plastic hybrid tubes in environmental chamber concept, subtle condensation, technical photo",
      "Cross-section diagram paper face bonded to plastic barrier tube wall, English labels, educational infographic",
    ],
    figures: [
      {
        alt: "Paper-faced kraft-look hybrid cosmetic tubes on a retail-style shelf.",
        caption:
          "The paper layer sells naturals; the polymer barrier carries the formula—recyclability copy must reflect both.",
      },
      {
        alt: "Concept of humidity and bathroom aging stress on paper-skinned tubes.",
        caption:
          "Watch seam lift, edge fray, and curl after accelerated aging—barrier still comes from plastic.",
      },
      {
        alt: "Laminate cross-section showing fiber facestock and inner polymer barrier.",
        caption:
          "Multi-material hybrids may be non-curbside-recyclable—arm sales with a short technical note, not hype.",
      },
    ],
  },
  {
    base: "evoh-barrier-tubes",
    prompts: [
      "Coextruded cosmetic squeeze tube with invisible EVOH oxygen barrier layer concept, premium skincare, studio, no text",
      "Magnified layered wall diagram PE tie layers EVOH core in tube, technical cross-section, English labels",
      "Stability testing cosmetic tubes weight loss versus oxygen, lab jars and tubes, professional",
    ],
    figures: [
      {
        alt: "Premium cosmetic tube suggesting coextruded EVOH oxygen barrier construction.",
        caption:
          "Oxygen- and aroma-sensitive fills often need more than monolayer PE—barrier trades flexibility and cost.",
      },
      {
        alt: "Layered wall schematic of PE skins, tie resins, and thin EVOH core in a tube.",
        caption:
          "Thicker EVOH is not always better—shoulder welding, squeeze feel, and OTR targets move together.",
      },
      {
        alt: "Laboratory-style comparison of filled barrier tubes under storage testing.",
        caption:
          "Test finished fills with weight loss and headspace—not empty tubes alone—before paying for barrier.",
      },
    ],
  },
  {
    base: "decoration-comparison",
    prompts: [
      "Cosmetic plastic tubes showing offset CMYK print, screen print bold spots, and hot stamp metallic accent samples, studio, no text",
      "Print shop table with screens cylinders and foil rolls for tube decoration, manufacturing B2B, no logos",
      "MOQ cost ladder infographic for cosmetic tube decoration passes, English, clean business graphic",
    ],
    figures: [
      {
        alt: "Cosmetic tubes comparing offset, screen printing, and hot stamping decoration finishes.",
        caption:
          "Setup, screens, cylinders, and color changes drive MOQ as much as tube diameter.",
      },
      {
        alt: "Production tools for offset, screen, and hot foil decoration on tubular packaging.",
        caption:
          "Offset suits fine type and gradients; screen carries opaque spots; foil needs skew and rub tolerances.",
      },
      {
        alt: "Chart-style graphic on consolidating spot colors and shared tooling across SKUs.",
        caption:
          "Share cylinders, harmonize Pantone, and sequence launches to amortize decoration tooling.",
      },
    ],
  },
  {
    base: "flip-screw-caps",
    prompts: [
      "Flip-top cap cosmetic tube next to screw cap tube, shower-friendly versus controlled dosing, studio white, no text",
      "Engineering cutaway flip hinge venting and screw thread torque on cosmetic closures, diagram English",
      "Automatic capping line cosmetic tubes flip top orientation versus screw cap, factory B2B photo",
    ],
    figures: [
      {
        alt: "Cosmetic tubes with flip-top cap and separate screw-cap closure examples.",
        caption:
          "Choose from the moment of use—showers favor flip-tops; thin formulas may need better screw seals.",
      },
      {
        alt: "Technical diagram of venting, orifices, and torque for tube closures.",
        caption:
          "Altitude and temperature cycles force air through gaps—spec drops in real ecommerce dunnage.",
      },
      {
        alt: "High-speed filling line applying oriented flip-top caps versus screw caps.",
        caption:
          "Flip-tops can be orientation-sensitive; screws need monitored torque—write maintenance thresholds into SOPs.",
      },
    ],
  },
  {
    base: "abl-pbl-laminates",
    prompts: [
      "Two cosmetic laminate squeeze tubes visually similar one aluminum barrier one all-plastic barrier, studio, no text",
      "Microscope style illustration flex cracks whitening ABL foil laminate versus PBL plastic laminate tubes, educational",
      "Recycling flowchart decision ABL with thin foil versus PBL plastic barrier tubes, English infographic",
    ],
    figures: [
      {
        alt: "Pair of laminate cosmetic tubes suggesting ABL foil barrier versus PBL polymer barrier.",
        caption:
          "Renders look alike; foil and polymer barriers diverge under stress and in end-of-life messaging.",
      },
      {
        alt: "Concept diagram of flex fatigue and whitening differences between ABL and PBL tubes.",
        caption:
          "Repeated squeezing exposes microcracking—always test with your oil load, not a placebo lotion.",
      },
      {
        alt: "Decision graphic on recycler acceptance for foil-thin ABL versus plastic-first PBL.",
        caption:
          "Prepare retailer questionnaire answers on foil thickness and local sorting—avoid brochure improvisation.",
      },
    ],
  },
  {
    base: "aluminum-plastic-tubes",
    prompts: [
      "Collapsible aluminum metal cosmetic tube beside colorful plastic squeeze tube, heritage versus mass market, studio, no text",
      "Internal lacquer coating aluminum tube cross-section versus monolayer plastic, technical diagram English",
      "Logistics dents on aluminum tube versus resilient plastic tube, realistic product photo",
    ],
    figures: [
      {
        alt: "Collapsible aluminum tube next to a plastic squeeze tube for cosmetics.",
        caption:
          "Metal signals heritage and pharmacy cues; plastic dominates resilience and decoration speed.",
      },
      {
        alt: "Diagram of internal lacquer on aluminum versus plastic compatibility for pH.",
        caption:
          "Wrong lacquer shows corrosion or off-notes; plastics may need barrier upgrades for the same actives.",
      },
      {
        alt: "Aluminum tube with dent next to undamaged plastic tube after handling.",
        caption:
          "Factor dent scrap, decoration cycles, and line speeds into unit economics—not piece price alone.",
      },
    ],
  },
  {
    base: "petg-pe-serum-packs",
    prompts: [
      "Clear PETG cosmetic serum bottle with dropper next to opaque PE squeeze tube, clarity versus portability, studio, no text",
      "Compatibility chart surfactant stress cracking PETG versus forgiving PE for skincare, infographic English",
      "Filling line pumps dosing serum into PETG bottle and into PE tube, factory B2B",
    ],
    figures: [
      {
        alt: "Transparent PETG serum bottle alongside a soft PE squeeze tube.",
        caption:
          "Clarity sells trust in serums; squeeze tubes win pocketability—pair format with pump or orifice design.",
      },
      {
        alt: "Technical infographic on chemical compatibility of PETG versus PE with aggressive surfactants.",
        caption:
          "PETG can stress-crack; PE is forgiving on many emulsions but may need EVOH for sensitive actives.",
      },
      {
        alt: "Cosmetic filling equipment suited to rigid bottles versus soft tubes.",
        caption:
          "Needles, seals, and changeover hours differ—compare landed cost including scrap, not components alone.",
      },
    ],
  },
  {
    base: "custom-moq-oem",
    prompts: [
      "Stack of printed cosmetic tube cylinders caps and color chips around MOQ planning desk, B2B packaging, no text",
      "Infographic five stacked minimum order quantities extrusion print cap color for OEM beauty brand, English",
      "Contract milestone timeline sampling tooling production for cosmetic packaging OEM, Gantt style clean",
    ],
    figures: [
      {
        alt: "Cosmetic packaging development samples including tubes, caps, and print proofs.",
        caption:
          "MOQ is a stack: extrusion, print cylinders, cap molds, and colorant minimums land together.",
      },
      {
        alt: "Graphic showing levers that lower true MOQ such as shared diameters and stock caps.",
        caption:
          "Harmonize diameters and Pantone; accept small cap tweaks before commissioning six unique molds.",
      },
      {
        alt: "Timeline graphic for milestones, samples, AQL, and bridge quantities in OEM contracts.",
        caption:
          "Tie payments to signed samples and write AQL—bridge quantities beat vague growth promises.",
      },
    ],
  },
  {
    base: "lead-times-packaging",
    prompts: [
      "Project calendar Gantt cosmetic packaging sampling tooling ocean freight peaks, desk scene, B2B, no text",
      "Parallel workflows artwork prepress lab compatibility and freight booking icons infographic English",
      "Team communication range earliest latest date assumptions cosmetic launch planning, clean graphic",
    ],
    figures: [
      {
        alt: "Planning calendar with packaging sampling, tooling, and shipping milestones.",
        caption:
          "Hidden doubles appear in shoulder iterations, compatibility holds, and peak-season freight.",
      },
      {
        alt: "Infographic of parallel paths: prepress, resin sign-off, and freight booking.",
        caption:
          "Overlap artwork with lab work; book freight when weight is within tolerance—not after last tweaks.",
      },
      {
        alt: "Graphic encouraging date ranges with explicit assumptions for internal stakeholders.",
        caption:
          "Ranges beat single optimistic dates—operations makes better calls when uncertainty is visible.",
      },
    ],
  },
  {
    base: "neck-finish-torque",
    prompts: [
      "Macro photo cosmetic tube neck threads and orifice beside mating cap technical drawing, no text",
      "Tolerance drawing major minor diameter thread engagement cosmetic closure English engineering",
      "Package drop test capped tubes in shipper carton torque validation, realistic photo",
    ],
    figures: [
      {
        alt: "Close-up of tube neck threads and cap interface with measurement context.",
        caption:
          "Pitch and orifice deltas creep leaks under vibration—‘it threads on’ is not a specification.",
      },
      {
        alt: "Engineering drawing excerpt for neck finish dimensions and engagement length.",
        caption:
          "Control drawings plus golden samples settle disputes faster than verbal vendor memory.",
      },
      {
        alt: "Shipper drop test setup with torque-verified capped cosmetic tubes.",
        caption:
          "Bench torque starts the story; ship tests after drops and temperature cycles finish it.",
      },
    ],
  },
  {
    base: "dropper-tip-tubes",
    prompts: [
      "Precision dropper-tip cosmetic squeeze tube dispensing serum drops, macro studio, skincare, no text",
      "Diagram viscosity surface tension drop formation in tube insert orifice, educational English",
      "QC inspection borescope style check dropper insert weld cleanliness cosmetic tube, technical photo",
    ],
    figures: [
      {
        alt: "Dropper-tip cosmetic tube dispensing a small serum droplet.",
        caption:
          "Insert geometry, venting, and surface tension must align or consumers see sputter and plugs.",
      },
      {
        alt: "Schematic of viscosity and temperature effects on dropper-tip performance.",
        caption:
          "Test cold-thick and hot-thin extremes—and upside-down storage travelers will use anyway.",
      },
      {
        alt: "Manufacturing quality check of dropper insert weld and bore cleanliness.",
        caption:
          "Flash and fibers alter dosing—set visual standards operators can apply without microscopes.",
      },
    ],
  },
  {
    base: "roller-ball-tubes",
    prompts: [
      "Roll-on deodorant and eye-care cosmetic tubes with steel roller balls, cool metallic sphere, studio, no text",
      "Corrosion resistance diagram stainless roller ball housing versus low pH formula, English infographic",
      "Consumer hygiene cleaning roller ball tube instructional simple icons English",
    ],
    figures: [
      {
        alt: "Roller-ball tubes for deodorant and eye-area care with visible metal balls.",
        caption:
          "Ball alloy, housing, and salts or acids interact—spec materials against your preservative system.",
      },
      {
        alt: "Technical graphic on corrosion risks from acidic or salty formulas in roll-ons.",
        caption:
          "Document cleaning guidance if consumers remove balls—hygiene claims need engineering backup.",
      },
      {
        alt: "Simple icons reminding claims discipline for cooling sensation versus medical outcomes.",
        caption:
          "Sensory copy stays in cosmetic lanes; eye-area SKUs need their own irritation and preservative plans.",
      },
    ],
  },
  {
    base: "sponge-applicator-tubes",
    prompts: [
      "Foundation BB cream tube with integrated sponge applicator tip, makeup hybrid, studio, no text",
      "Exploded view removable versus fixed sponge head tube packaging hygiene tradeoffs diagram English",
      "QC abrasion sponge shedding glue lines on cosmetic applicator tube, technical photo",
    ],
    figures: [
      {
        alt: "Cosmetic tube with sponge applicator for foundation or BB cream.",
        caption:
          "Porous sponges hold moisture—align preservatives and drying guidance with the interface.",
      },
      {
        alt: "Diagram comparing removable sponge heads versus fixed tips for refill stories.",
        caption:
          "Removable heads complicate inventory; fixed tips simplify manufacturing but limit refill narratives.",
      },
      {
        alt: "Quality inspection concept for sponge glue lines, fiber shed, and swelling.",
        caption:
          "Swelling sponges can change closure engagement—QC beyond surface cosmetics appearance.",
      },
    ],
  },
  {
    base: "oval-cosmetic-tubes",
    prompts: [
      "Oval cross-section cosmetic tubes front panel label billboard on peg hook retail, studio, no text",
      "Stress analysis style illustration oval tube major axis squeeze wall strain technical English",
      "Pallet load oval tubes avoiding point loads logistics diagram clean",
    ],
    figures: [
      {
        alt: "Oval-profile cosmetic tubes showing a wide front label panel.",
        caption:
          "Ovals merchandise logos well but concentrate stress along the flatter faces when squeezed.",
      },
      {
        alt: "Technical illustration of uneven wall strain when squeezing an oval tube.",
        caption:
          "Validate print adhesion and stress cracking on the broad faces—flex mocks beat flat renders.",
      },
      {
        alt: "Logistics sketch for palletizing oval tubes without point-loading shoulders.",
        caption:
          "If consumers crush tubes in bags, rounds may survive better unless walls are tuned.",
      },
    ],
  },
  {
    base: "eu-sustainability-packaging",
    prompts: [
      "EU map folder of technical documents cosmetic tube recyclability EPR paperwork, desk B2B, no text",
      "Collage resin codes ink systems separability icons for packaging compliance English infographic",
      "Operations team training sustainable packaging claims discipline office scene realistic",
    ],
    figures: [
      {
        alt: "Document binder suggesting EU EPR and packaging data requests for exporters.",
        caption:
          "Retailer spreadsheets follow EU packaging rules—material codes, separability, and proof matter.",
      },
      {
        alt: "Infographic of drawings, resin IDs, ink systems, and end-market scenarios.",
        caption:
          "Refresh evidence when laminates or labels change—avoid copying last year’s answers.",
      },
      {
        alt: "Team discussion graphic on cautious retailer language and SKU simplification.",
        caption:
          "Train sales to defer rather than guess; documentation beats adjectives in audits.",
      },
    ],
  },
  {
    base: "travel-mini-tubes",
    prompts: [
      "Mini travel-size cosmetic tubes 100ml compliant sizes in toiletry bag airport context subtle, studio, no text",
      "Leak test mini tubes vibration pressure altitude icons infographic English",
      "Retail clip strip mini tubes twisted in fixture durability photo realistic",
    ],
    figures: [
      {
        alt: "Small travel-size cosmetic tubes arranged for portability and trial.",
        caption:
          "Minis reduce trial cost but face the worst handling—design for abuse, not only still-life shots.",
      },
      {
        alt: "Graphic on venting, torque bands, and orifice plugs for pressure and motion.",
        caption:
          "Test inside the actual overwrap and clip strips that twist product in stores.",
      },
      {
        alt: "Reminder graphic that airline liquid rules vary by jurisdiction.",
        caption:
          "Keep claims category-accurate; universal carry-on promises rarely hold across every channel.",
      },
    ],
  },
  {
    base: "sunscreen-spf-tubes",
    prompts: [
      "Beach summer sunscreen SPF cream tubes sand salt spray environment realistic product photo, no text",
      "Organic UV filter inorganic mineral dispersion cosmetic tube compatibility lab concept English diagram",
      "Hot supply chain truck container yard temperature stress cosmetic tubes infographic",
    ],
    figures: [
      {
        alt: "Sunscreen tubes in a summer beach context with sand and bright light.",
        caption:
          "UV filters and solvents stress seals and inks differently than basic body lotions.",
      },
      {
        alt: "Technical concept of filter-solvent interaction with tube materials.",
        caption:
          "Disclose filter load early—sunscreen compatibility folders are rarely ‘just another cream’.",
      },
      {
        alt: "Logistics heat graphic for container yards and summer trucks versus mild lab storage.",
        caption:
          "Model elevated storage for destination corridors, not only 25 °C defaults.",
      },
    ],
  },
  {
    base: "toothpaste-cosmetic-lessons",
    prompts: [
      "High-speed oral care toothpaste laminate tubes on filling line scale next to smaller cosmetic tubes contrast B2B, no text",
      "Lessons borrowed shoulder robustness metal detection vision-friendly decoration zones infographic English",
      "Warning sign oral care versus cosmetic regulatory claims separation simple graphic",
    ],
    figures: [
      {
        alt: "Industrial oral-care tube line contrasted with boutique cosmetic tube scale.",
        caption:
          "Toothpaste lines proved high-speed shoulders and tamper cues—cosmetics can borrow the engineering discipline.",
      },
      {
        alt: "Infographic of transferable factory controls like vision zones and shoulder checks.",
        caption:
          "Lift manufacturing ideas, not regulatory files—oral and cosmetic claims live under different rules.",
      },
      {
        alt: "Graphic separating oral-care regulatory path from cosmetic marketing language.",
        caption:
          "Reformulate the dossier when categories differ; do not transplant claims verbatim.",
      },
    ],
  },
  {
    base: "lip-gloss-wand-squeeze",
    prompts: [
      "Lip gloss wand vial beside squeeze tube lip oil balm cosmetic packaging comparison studio, no text",
      "Hot fill air bubble schematic in lip product packaging squeeze versus wand English diagram",
      "Manufacturing component count wand assembly versus simple squeeze tube cost infographic",
    ],
    figures: [
      {
        alt: "Wand-applicator lip gloss pack next to a squeeze tube for oils or balms.",
        caption:
          "Wands control tacky films; squeeze tubes need inserts that stop leaks for thin oils.",
      },
      {
        alt: "Diagram of trapped air expansion after hot fill in lip products.",
        caption:
          "Tune fill temperature, dwell, and torque together—bubbles are a system problem.",
      },
      {
        alt: "Comparison of part count and scrap for wand packs versus squeeze tubes.",
        caption:
          "Wands add assembly stations but can cut returns when consumers dislike squeeze control.",
      },
    ],
  },
  {
    base: "soft-touch-handcream",
    prompts: [
      "Soft-touch matte coated hand cream cosmetic tube elegant tactile finish, studio, no text",
      "Abrasion test denim wallet cosmetic soft-touch coating durability concept photo",
      "Recyclability questionnaire soft-touch coating documentation folder infographic English",
    ],
    figures: [
      {
        alt: "Hand cream tube with premium soft-touch matte coating.",
        caption:
          "Soft-touch bridges pharmacy efficacy cues and boutique feel—if it survives purses and sanitizers.",
      },
      {
        alt: "Durability concept: coated tube rubbing against fabric and leather surfaces.",
        caption:
          "Specify gloss shift and tack after abrasion and alcohol exposure—not just design-room feel.",
      },
      {
        alt: "Technical letters and recycler questionnaire icons for coated tubes.",
        caption:
          "Some coatings complicate recycler scoring—keep supplier letters for sustainability teams.",
      },
    ],
  },
  {
    base: "hair-mask-large-tubes",
    prompts: [
      "Large diameter high-viscosity hair mask cosmetic tube salon back-bar size, studio, no text",
      "Salon back-bar pump use versus retail peg hook same tube diameter planning graphic English",
      "Inverted cap-down storage large tube shoulder creep stress diagram technical",
    ],
    figures: [
      {
        alt: "Large-format hair mask tube suggesting high-viscosity rheology.",
        caption:
          "Butters and scrubs need orifices and shoulders matched to shear behavior—not only a big diameter.",
      },
      {
        alt: "Split scene salon pump refill versus retail shelf facing for the same SKU.",
        caption:
          "Plan cap and label zones for wet-handed back-bar use and for theft-tag retail fixtures.",
      },
      {
        alt: "Diagram of long-term cap-down storage stress on shoulder welds.",
        caption:
          "Standing tubes cap-down helps evacuation—check creep on welds when formula loads the closure side.",
      },
    ],
  },
  {
    base: "luxury-metallic-foil",
    prompts: [
      "Luxury cosmetic tubes cold foil metallic mirror finish under bright retail spotlight, premium, no text",
      "Prepress distortion compensation curved tube surface step proof diagram English",
      "QC photo acceptable versus reject cold foil skew pinholes rub test cosmetic tubes",
    ],
    figures: [
      {
        alt: "Metallic cold-foil decorated cosmetic tubes under dramatic retail lighting.",
        caption:
          "Duty-free lighting exposes streaks and chatter—proof under real spot conditions.",
      },
      {
        alt: "Technical diagram of distortion mapping for printing on curved tubes.",
        caption:
          "Build compensation on real tubes, not flat mockups—ovals differ from rounds.",
      },
      {
        alt: "Quality comparison of acceptable foil registration versus defective skew and pinholes.",
        caption:
          "Photo-based tolerances for skew, pinholing, and rub after flex keep QC aligned with brand.",
      },
    ],
  },
  {
    base: "child-resistant-closures",
    prompts: [
      "Child-resistant cap cosmetic tube pharmacy adjacent SKU studio neutral regulatory tone, no text",
      "Certification laboratory testing CR closure protocol icons English infographic",
      "Adult ergonomics torque child resistance balance diagram simple clean",
    ],
    figures: [
      {
        alt: "Child-resistant closure on a tube suggesting RX-adjacent or regulated SKU.",
        caption:
          "Most beauty SKUs stay non-CR—invoke CR only when rules truly apply.",
      },
      {
        alt: "Infographic of lab protocols and documentation for certified CR packaging.",
        caption:
          "Marketing copy never substitutes for test reports—use accredited labs for the right standard.",
      },
      {
        alt: "Graphic balancing adult usability with child-resistant mechanisms.",
        caption:
          "Reasonable torque and warnings still reduce nuisance openings on mainstream lines.",
      },
    ],
  },
  {
    base: "compostable-tubes",
    prompts: [
      "Industrial composting facility concept versus cosmetic serum tube realistic honest packaging story, no text",
      "Certification standards ASTM EN compostability checklist infographic English",
      "Brand risk overclaim underclaim messaging scale graphic simple",
    ],
    figures: [
      {
        alt: "Contrast of limited compost infrastructure with typical premium serum tubes.",
        caption:
          "Search interest outruns certified high-barrier compost tubes for many serums.",
      },
      {
        alt: "Checklist graphic referencing standards, thickness, and home versus industrial compost claims.",
        caption:
          "Demand standard references and conditions—vague masterbatch promises are red flags.",
      },
      {
        alt: "Simple scale weighing overclaim risk against conservative documented claims.",
        caption:
          "Underclaim with documentation beats the opposite for regulators and savvy consumers.",
      },
    ],
  },
  {
    base: "pe-blend-firmness",
    prompts: [
      "Cosmetic squeeze tubes varying stiffness LDPE LLDPE HDPE blend hand-feel comparison studio, no text",
      "Modulus temperature curve soft bathroom hot warehouse PE tube behavior diagram English",
      "Formula migration weight loss testing PE tube wall chemistry infographic",
    ],
    figures: [
      {
        alt: "Assorted PE cosmetic tubes showing different wall firmness and snap-back.",
        caption:
          "LDPE feels soft, HDPE adds spring—consumers read quality from collapse and recovery.",
      },
      {
        alt: "Chart concept of PE modulus shifting between cold bathrooms and hot warehouses.",
        caption:
          "Prototype across your distribution climate, not only at room temperature.",
      },
      {
        alt: "Lab-style graphic pairing mechanical squeeze tests with migration and weight loss.",
        caption:
          "A stiff premium tube fails if actives migrate—pair hand feel with chemistry folders.",
      },
    ],
  },
  {
    base: "clean-beauty-airless",
    prompts: [
      "Airless pump cosmetic tube preserving low-preservative clean beauty serum oxygen protection studio, no text",
      "Oxygen exposure comparison jar with spatula versus airless tube twenty dispenses infographic English",
      "Microbiology challenge test airless packaging production scale lab photo concept",
    ],
    figures: [
      {
        alt: "Airless tube packaging for preservative-light or clean-positioned skincare.",
        caption:
          "Shorter INCI lists push risk to interfaces—airless limits oxygen and finger contact but not bad GMP.",
      },
      {
        alt: "Graphic comparing cumulative oxygen and contamination across many jar dips versus airless doses.",
        caption:
          "Model twenty real dispensing events—airless often wins on cumulative exposure.",
      },
      {
        alt: "Challenge testing concept at production scale with the chosen airless pack.",
        caption:
          "Pack changes are formula change events—include fill-line sanitation and torque drift in the plan.",
      },
    ],
  },
];
