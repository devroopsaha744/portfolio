export type Achievement = {
  place: string;
  title: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    place: "Runner-up",
    title: "Sparrowthon (Techdome)",
    detail: "All-India hackathon, 350+ participants, with Chirpy (RAG for API management).",
  },
  {
    place: "4th",
    title: "Data Analytics Competition, NSSC, IIT Kharagpur",
    detail: "Out of 450+ participants.",
  },
  {
    place: "Top 10",
    title: "AI Bioinnovate Hackathon (IIT Jodhpur & ChemBioAI)",
    detail: "Against 500+ competitors, on molecular toxicity prediction from SMILES notation.",
  },
  {
    place: "2nd",
    title: "AKTU Technical, Literary & Management Fest",
    detail: "KIET Ghaziabad, 100+ participants.",
  },
  {
    place: "2nd",
    title: "Department rank in university examinations",
    detail: "Plus cash awards for academic performance and attendance.",
  },
];
