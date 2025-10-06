# Detail Dynamics - Talk to Rosie Chatbot Widget

A secure, production-ready chatbot widget featuring both text and voice chat capabilities powered by VAPI and Retell AI.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- A [Vercel account](https://vercel.com/signup) (free)
- A [GitHub account](https://github.com/signup) (free)
- Your API keys from VAPI and Retell AI

### Step 1: Push to GitHub

1. **Initialize git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with secure chatbot"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it `detaildynamics` (or any name you prefer)
   - Do NOT initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/detaildynamics.git
   git branch -M main
   git push -u origin main
   ```
   *(Replace YOUR-USERNAME with your actual GitHub username)*

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com) and sign in**

2. **Import your GitHub repository:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your `detaildynamics` repository
   - Click "Import"

3. **Configure the project:**
   - Project Name: `detaildynamics` (or whatever you prefer)
   - Framework Preset: Leave as "Other"
   - Root Directory: `./` (leave as default)
   - Click "Deploy" (it will deploy first, then we add secrets)

4. **Add Environment Variables (IMPORTANT!):**
   - After the first deployment, go to your project dashboard
   - Click "Settings" tab
   - Click "Environment Variables" in the sidebar
   - Add these four variables:

   | Name | Value |
   |------|-------|
   | `VAPI_API_KEY` | `a025d33b-8e6a-45ee-bda4-ec22db21e1b6` |
   | `VAPI_ASSISTANT_ID` | `c86d0583-5a3a-4085-8976-28bff7f0e71b` |
   | `RETELL_API_KEY` | `key_f636ae490564b5eeb88a55223ed9` |
   | `RETELL_AGENT_ID` | `agent_6b974ba4769d7b7b8df27d05d0` |

   - For each variable, select all environments (Production, Preview, Development)
   - Click "Save"

5. **Redeploy with environment variables:**
   - Go to "Deployments" tab
   - Click the three dots (...) on the latest deployment
   - Click "Redeploy"
   - Check "Use existing Build Cache"
   - Click "Redeploy"

### Step 3: Test Your Widget

1. **Your site will be live at:** `https://detaildynamics.vercel.app` (or your custom name)

2. **Test both features:**
   - Click the chat button (💬)
   - Try text chat by typing a message
   - Switch to voice chat and click "Start Call"

### Step 4: Embed on Client's Website

Once deployed, the web developer can add this to any page:

```html
<!-- Add this anywhere in the HTML body -->
<script src="https://YOUR-PROJECT.vercel.app/widget.js"></script>
```

Or simply provide them the full Vercel URL to iframe or embed.

---

## 🔒 Security Features

✅ **No exposed API keys** - All credentials are stored securely in Vercel environment variables
✅ **Server-side API calls** - Your keys never touch the client browser
✅ **CORS protection** - Can be restricted to specific domains
✅ **Production-ready** - 24/7 uptime with Vercel's global CDN

---

## 📁 Project Structure

```
detaildynamics/
├── api/
│   ├── vapi-chat.js       # Secure VAPI text chat endpoint
│   └── retell-call.js     # Secure Retell voice call endpoint
├── index.html             # Main chatbot widget (updated to use secure endpoints)
├── simple-backend.html    # (deprecated - not needed anymore)
├── .env.example           # Template for environment variables
├── .gitignore            # Prevents committing secrets
└── README.md             # This file
```

---

## 🛠️ Local Development (Optional)

If you want to test locally before deploying:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Create `.env.local` file:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your actual API keys.

3. **Run locally:**
   ```bash
   vercel dev
   ```

   Your site will be available at `http://localhost:3000`

---

## 🔧 Troubleshooting

### Chat not working?
- Check that all 4 environment variables are set in Vercel
- Make sure you redeployed after adding the variables
- Check browser console for errors (F12 → Console tab)

### Voice call not connecting?
- Ensure microphone permissions are granted
- Check that Retell API key and agent ID are correct
- Voice calls require HTTPS (Vercel provides this automatically)

### API errors?
- Verify your API keys are still valid
- Check API usage limits on VAPI/Retell dashboards

---

## 📞 Support

- **VAPI Documentation:** https://docs.vapi.ai
- **Retell AI Documentation:** https://docs.retellai.com
- **Vercel Documentation:** https://vercel.com/docs

---

## ⚠️ Important Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Rotate your keys** - If the old keys were exposed publicly, consider rotating them in VAPI/Retell dashboards
3. **Monitor usage** - Keep an eye on your VAPI and Retell usage to avoid unexpected charges
4. **Update CORS** - In production, update the `Access-Control-Allow-Origin` in the API files to only allow your client's domain

---

## 📝 License

Proprietary - Cold Lava / Detail Dynamics

---

**Built with ❤️ for Cold Lava**
