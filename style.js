body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(180deg, #f3f3f3, #dce7f9);
  margin: 0;
  padding: 0;
  color: #333;
}

header {
  background: #ef5350;
  color: white;
  text-align: center;
  padding: 1.5rem;
}

h1 {
  margin: 0;
}

.search {
  text-align: center;
  margin: 2rem 0;
}

.search input {
  width: 60%;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.search button {
  padding: 0.7rem 1rem;
  border: none;
  background: #42a5f5;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  border-radius: 8px;
}

.sets {
  background: #f0f0f0;
  padding: 1rem;
}

.sets ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.sets li {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
