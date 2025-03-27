use("CRM");

db.users.insertMany([
  { "name": "John Smith", "userID": 12345, "purchases": 10, "lastActivity": "2024-03-10", "loyaltyScore": 92, "reward": "Exclusive VIP access + 20% discount" },
  { "name": "Alice Johnson", "userID": 67890, "purchases": 8, "lastActivity": "2024-02-25", "loyaltyScore": 88, "reward": "Early access to new products" },
  { "name": "David Williams", "userID": 34567, "purchases": 5, "lastActivity": "2024-01-15", "loyaltyScore": 76,  "reward": "Free shipping on next order" },
  { "name": "Emma Brown", "userID": 89012, "purchases": 12, "lastActivity": "2024-03-18", "loyaltyScore": 95,  "reward": "Personalized discount + free gift" },
  { "name": "Michael Davis", "userID": 45678, "purchases": 3, "lastActivity": "2023-12-10", "loyaltyScore": 60, "reward": "10% discount on first purchase" },
  { "name": "Sophia Wilson", "userID": 90123, "purchases": 9, "lastActivity": "2024-03-05", "loyaltyScore": 90,  "reward": "Priority customer service" },
  { "name": "James Taylor", "userID": 56789, "purchases": 6, "lastActivity": "2024-02-10", "loyaltyScore": 82,  "reward": "5% discount on next purchase" },
  { "name": "Olivia Martinez", "userID": 23456, "purchases": 15, "lastActivity": "2024-03-20", "loyaltyScore": 97,  "reward": "Exclusive event invitations" },
  { "name": "Liam Anderson", "userID": 78901, "purchases": 4, "lastActivity": "2024-01-20", "loyaltyScore": 72,  "reward": "Loyalty points for future discounts" },
  { "name": "Charlotte Thomas", "userID": 34512, "purchases": 11, "lastActivity": "2024-03-12", "loyaltyScore": 93, "reward": "Exclusive VIP access + 25% discount" }
]);
