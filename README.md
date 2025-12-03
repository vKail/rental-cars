# 🚙 Rental Cars System

Complete vehicle rental management system developed with Next.js. Supports online reservations, fleet administration, and management with three roles: client, employee, and administrator.

## 📋 Description

Modern platform for vehicle rental companies. Allows clients to search and book cars online, employees to manage deliveries/returns, and administrators to control the entire fleet and generate reports.

**Features:**

-   Advanced vehicle search
    
-   Real-time reservation system
    
-   Integrated payments with Stripe
    
-   Complete administrative panel
    
-   Fleet management
    
-   Financial and analytical reports
    

## 🛠️ Technologies

-   TypeScript
    
-   Next.js 14
    
-   Zustand (state management)
    
-   Tailwind CSS
    
-   PostgreSQL
    
-   NextAuth.js
    

## 🚀 Installation

```
# Clone the repository
git clone [https://github.com/vKail/rental-cars.git](https://github.com/vKail/rental-cars.git)
cd rental-cars

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start server
npm run dev

```

## 📂 Project Structure

```
src/
├── core/
├── features/
│   ├── vehicles/
│   │   ├── presentation/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── interfaces/
│   ├── reservations/
│   └── admin/
└── shared/

```

## 👥 Contributors

-   **Adrian Jurado** - [@vKail](https://github.com/vKail "null")
