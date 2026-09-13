# Aroma Flowers Corner - Demo Login Credentials

## Customer Login (Test Accounts)

You can test the sign-in functionality using any of these methods:

### Method 1: Google Login (One-Click)
- Click "Continue with Google" button
- Automatically logs in as "Google User"
- Email: user@gmail.com
- Phone: 9923106684

### Method 2: Phone Number Login
- Click "Continue with Phone Number" button
- Enter any 10-digit number (e.g., `9999999999`)
- Enter any OTP when prompted (e.g., `1234`)
- Automatically logs in as "Phone User"

### Method 3: Email & Password Sign Up/Login
**Demo Account:**
- Full Name: `Test Customer`
- Email: `test@aromaflowers.com`
- Phone: `9923106684`
- Password: `Bloom@2024`

**Or create your own account:**
- Use any name
- Use any valid email format
- Use any 10-digit phone number
- Use any password (minimum 8 characters recommended)

## Owner Dashboard Access

To access the Owner Dashboard:
1. Click the Settings icon (⚙️) in the header navigation
2. No login required for demo purposes
3. You can view and manage:
   - All customer orders
   - Inventory for both shops (Manish Nagar & Khamla)
   - Calendar bookings
   - Customer profiles

## Features to Test

### Customer Features:
✅ Sign In / Sign Up with 3 methods
✅ User profile dropdown in header (shows first name after login)
✅ Log Out functionality
✅ Cart button (navigates to Account page)
✅ Hamburger menu (☰) on all devices
✅ Product customization builder
✅ Order booking with calendar
✅ Order tracking

### Owner Features:
✅ View all customer registrations
✅ Manage inventory per shop location
✅ Update order status (Received → In Progress → Ready → Out for Delivery → Delivered)
✅ Upload ready photos
✅ Manage calendar bookings

## Notes

- All user data is stored in browser localStorage for demo purposes
- In production, this would be connected to a real backend database
- The authentication is simulated - in production, integrate with Firebase/Auth0 or similar
- Both shop locations (Manish Nagar and Khamla) are tracked separately in inventory

## Deployment to Vercel

The project is ready for deployment:
```bash
cd /workspace/aroma-copy
npm run build
```

The `dist` folder contains the production build ready for Vercel deployment.

Connect your GitHub repository to Vercel for automatic deployments on push.
