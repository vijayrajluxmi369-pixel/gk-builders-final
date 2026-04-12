# 🔑 VERCEL ENVIRONMENT VARIABLES - COPY PASTE करो

## ✅ सब Variables यहाँ हैं - Direct Copy करके Vercel में Paste करो

---

## **STEP 1: Vercel Dashboard खोलो**
1. https://vercel.com/dashboard जाओ
2. अपना project select करो: `gk-builders`
3. **Settings** tab खोलो
4. **Environment Variables** section खोलो

---

## **STEP 2: हर एक variable को Add करो**

### **Variable 1: DATABASE_URL** ⭐ CRITICAL

**Name:** `DATABASE_URL`

**Value:** (नीचे दिए गए options में से एक choose करो)

**Option A: PlanetScale से (Recommended - Free)**
```
mysql://xxxxx:pscale_pw_xxxxx@xxxxx.us-east-2.psdb.cloud/gk_builders?sslaccept=strict
```
Steps:
1. https://www.planetscale.com खोलो
2. GitHub से sign up करो
3. नया database create करो (name: gk_builders)
4. "Connect" button दबाओ
5. "Node.js" select करो
6. Connection string copy करो
7. ऊपर paste करो

**Option B: अगर तुम्हारे पास पहले से MySQL है:**
```
mysql://username:password@hostname:3306/database_name
```

---

### **Variable 2: JWT_SECRET** ⭐ CRITICAL

**Name:** `JWT_SECRET`

**Value:** (नीचे दिए गए में से एक choose करो)

**Option A: Generate करो (Terminal में):**
```bash
openssl rand -base64 32
```

**Option B: Ready-made values (कोई एक use करो):**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

या

```
x9y8z7a6b5c4d3e2f1g0h9i8j7k6l5m4n3o2p1q0r9s8t7u6v5w4x3y2z1a0b9c8
```

---

### **Variable 3: VITE_APP_ID** ✅ REQUIRED

**Name:** `VITE_APP_ID`

**Value:** (Manus Dashboard से copy करो)

Steps:
1. https://app.manus.im खोलो
2. अपना project select करो: `gk-builders`
3. **Settings** → **Secrets** खोलो
4. `VITE_APP_ID` का value copy करो
5. Vercel में paste करो

**या यहाँ से copy करो (अगर available है):**
```
gk-builders-app-id-xxxxx
```

---

### **Variable 4: VITE_OAUTH_PORTAL_URL** ✅ REQUIRED

**Name:** `VITE_OAUTH_PORTAL_URL`

**Value:** (Manus Dashboard से copy करो)

Steps:
1. https://app.manus.im खोलो
2. Settings → Secrets खोलो
3. `VITE_OAUTH_PORTAL_URL` का value copy करो
4. Vercel में paste करो

**Standard value:**
```
https://portal.manus.im
```

---

### **Variable 5: OAUTH_SERVER_URL** ✅ REQUIRED

**Name:** `OAUTH_SERVER_URL`

**Value:** (Manus Dashboard से copy करो)

Steps:
1. https://app.manus.im खोलो
2. Settings → Secrets खोलो
3. `OAUTH_SERVER_URL` का value copy करो
4. Vercel में paste करो

**Standard value:**
```
https://api.manus.im
```

---

### **Variable 6: VITE_FRONTEND_FORGE_API_KEY** ⚠️ RECOMMENDED

**Name:** `VITE_FRONTEND_FORGE_API_KEY`

**Value:** (Manus Dashboard से copy करो)

Steps:
1. https://app.manus.im खोलो
2. Settings → Secrets खोलो
3. `VITE_FRONTEND_FORGE_API_KEY` का value copy करो
4. Vercel में paste करो

---

### **Variable 7: VITE_FRONTEND_FORGE_API_URL** ⚠️ RECOMMENDED

**Name:** `VITE_FRONTEND_FORGE_API_URL`

**Value:** (Manus Dashboard से copy करो)

Steps:
1. https://app.manus.im खोलो
2. Settings → Secrets खोलो
3. `VITE_FRONTEND_FORGE_API_URL` का value copy करो
4. Vercel में paste करो

**Standard value:**
```
https://api.manus.im
```

---

### **Variable 8: STRIPE_SECRET_KEY** ⚠️ OPTIONAL (Payment के लिए)

**Name:** `STRIPE_SECRET_KEY`

**Value:** (Stripe Dashboard से copy करो)

Steps:
1. https://dashboard.stripe.com खोलो
2. **Developers** → **API Keys** खोलो
3. **Secret Key** copy करो
4. Vercel में paste करो

---

### **Variable 9: VITE_STRIPE_PUBLISHABLE_KEY** ⚠️ OPTIONAL (Payment के लिए)

**Name:** `VITE_STRIPE_PUBLISHABLE_KEY`

**Value:** (Stripe Dashboard से copy करो)

Steps:
1. https://dashboard.stripe.com खोलो
2. **Developers** → **API Keys** खोलो
3. **Publishable Key** copy करो
4. Vercel में paste करो

---

## **STEP 3: सब Variables Add करने के बाद**

1. **Deployments** tab खोलो
2. Latest failed deployment पर click करो
3. **"Redeploy" button** दबाओ
4. Build logs देखो (2-5 minutes लगेंगे)
5. ✅ **Build successful** होने का wait करो

---

## **⚠️ IMPORTANT NOTES:**

1. **कभी भी ये values GitHub में commit मत करो!**
2. **सिर्फ Vercel में add करो**
3. **API keys को किसी से share मत करो**
4. **Production के लिए हमेशा secure values use करो**

---

## **अगर कोई value नहीं मिल रहा तो:**

1. **Manus Dashboard खोलो** → Settings → Secrets
2. **सब values वहाँ मिलेंगे**
3. **Copy करके Vercel में paste करो**

---

## **Build fail हो तो:**

1. सब variables सही से add हैं की नहीं check करो
2. DATABASE_URL format सही है की नहीं check करो
3. JWT_SECRET empty तो नहीं है check करो
4. Vercel logs में exact error देखो

---

**अब तुम ready हो! 🚀 Vercel में सब add करो और Redeploy करो!**
