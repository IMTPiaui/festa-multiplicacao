import { useState } from 'react';

const initialItems = [
  { id: 1, name: 'Arroz (20kg)', unit: 'kg', total: 20, available: 20 },
  { id: 2, name: 'Carne de Sol (20kg)', unit: 'kg', total: 20, available: 20 },
  { id: 3, name: 'Óleo (6 un)', unit: 'un', total: 6, available: 6 },
];

export default function DoacaoApp() {
  const [items, setItems] = useState(initialItems);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itemId, setItemId] = useState(1);
  const [doacoes, setDoacoes] = useState([]);

  const doar = () => {
    const itemIndex = items.findIndex(i => i.id === itemId);
    const item = items[itemIndex];

    if (quantidade <= 0 || quantidade > item.available) return;

    const novaDisponibilidade = item.available - quantidade;
    const novosItens = [...items];
    novosItens[itemIndex] = { ...item, available: novaDisponibilidade };
    setItems(novosItens);

    setDoacoes([...doacoes, {
      nome,
      whatsapp,
      item: item.name,
      quantidade
    }]);

    setQuantidade(1);
    setItemId(1);
  };

  const isValidWhatsApp = (number) => {
    const regex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
    return regex.test(number);
  };

  const isFormValid = nome && isValidWhatsApp(whatsapp) && quantidade > 0;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Registro de Doação</h2>
      <div>
        <label>Nome</label><br />
        <input value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div>
        <label>WhatsApp (somente números com DDD)</label><br />
        <input
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          placeholder="Ex: 86999998888"
        />
      </div>
      <div>
        <label>Item</label><br />
        <select value={itemId} onChange={e => setItemId(Number(e.target.value))}>
          {items.filter(i => i.available > 0).map(item => (
            <option key={item.id} value={item.id}>{item.name} — disponível: {item.available} {item.unit}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantidade</label><br />
        <input
          type="number"
          min="1"
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
        />
      </div>
      <button onClick={doar} disabled={!isFormValid}>Confirmar Doação</button>

      <hr />

      <h2>Doações Registradas</h2>
      {doacoes.map((d, i) => (
        <div key={i}>
          <strong>{d.nome}</strong> ({d.whatsapp}) doou {d.quantidade} {items.find(it => it.name === d.item)?.unit} de <em>{d.item}</em>
        </div>
      ))}
    </div>
  );
}
