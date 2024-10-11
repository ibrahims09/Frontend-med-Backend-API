import React, { useState, useEffect } from 'react';

const CampaignListAndCreate = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Något gick fel med att hämta kampanjerna');
        }

        const data = await response.json();
        setCampaigns(data); 
      } catch (error) {
        console.error('Fel vid hämtning av kampanjer:', error);
      }
    };
    
    fetchCampaigns();
  }, []); 
 
  const handleCreateCampaign = async () => {
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Kunde inte skapa kampanjen');
      }

      const newCampaign = await response.json();
      setCampaigns([...campaigns, newCampaign]); 
      setName(''); 
      setDescription(''); 
    } catch (error) {
      console.error('Fel vid skapande av kampanj:', error);
    }
  };

  return (
    <div>
      <h2>Kampanjer</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>{campaign.name}: {campaign.description}</li>
        ))}
      </ul>

      <h2>Skapa ny kampanj</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Kampanjnamn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateCampaign}>Skapa kampanj</button>
      </form>
    </div>
  );
};

export default CampaignListAndCreate;

