export const getDeck = async () => {
  const res = await fetch("http://localhost:5000/deck/shuffled");
  const data = await res.json();
  return data;
};
