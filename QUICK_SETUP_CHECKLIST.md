# GK Builders - Quick Domain Setup Checklist

**Goal:** Get `www.gkbuilders.services` in Google search results (NOT Manus URL)  
**Time Required:** 30 minutes setup + 24-48 hours for DNS propagation  
**Cost:** FREE

---

## 🚀 Quick Start (Do This First)

### ✅ Step 1: Verify Manus Configuration (5 minutes)

**In Manus Dashboard:**
1. Open: https://manus.im
2. Select "GK Builders" project
3. Click **Settings** → **Domains**
4. Verify:
   - [ ] `www.gkbuilders.services` shows **Connected**
   - [ ] SSL certificate shows **Active**
   - [ ] Domain is marked as **Primary**

**If domain is NOT showing:**
- Click **Add Domain**
- Enter: `www.gkbuilders.services`
- Follow DNS setup instructions

---

### ✅ Step 2: Check GoDaddy DNS (5 minutes)

**In GoDaddy Account:**
1. Go: https://www.godaddy.com
2. Sign in
3. Find domain: `gkbuilders.services`
4. Click **Manage DNS**

**Verify DNS Records:**
```
Look for ONE of these:

Option A - A Record:
├─ Type: A
├─ Name: www
└─ Value: [Manus IP - ask Manus support if unsure]

Option B - CNAME Record:
├─ Type: CNAME
├─ Name: www
└─ Value: gkbuilds-hr3vcc76.manus.space
```

**If records are missing:**
- Contact Manus support for exact DNS values
- Or check Manus Dashboard → Settings → Domains for DNS instructions

---

### ✅ Step 3: Test Domain (5 minutes)

**Test 1: Does domain work?**
```
Open in browser: https://www.gkbuilders.services
Should see: Your website with green lock icon ✓
```

**Test 2: Check robots.txt**
```
Open: https://www.gkbuilders.services/robots.txt
Should see: robots.txt content ✓
```

**Test 3: Check sitemap**
```
Open: https://www.gkbuilders.services/sitemap.xml
Should see: XML sitemap content ✓
```

**If any test fails:**
- Wait 24 hours for DNS propagation
- Then test again

---

## 🔍 Google Search Console Setup (10 minutes)

### ✅ Step 4: Add to Google Search Console

1. **Go to:** https://search.google.com/search-console
2. **Sign in** with Google account (create if needed)
3. **Click:** "Add Property"
4. **Select:** "URL prefix"
5. **Enter:** `https://www.gkbuilders.services`
6. **Click:** "Continue"

### ✅ Step 5: Verify Ownership (Recommended: DNS Method)

**Option A: DNS Verification (Recommended)**
1. Google shows: "TXT record"
2. Copy the verification code
3. Go to GoDaddy DNS settings
4. Add new TXT record:
   ```
   Type: TXT
   Name: @ (root)
   Value: [Paste Google's code]
   TTL: 3600
   ```
5. Wait 5-10 minutes
6. Click "Verify" in Google Search Console

**Option B: HTML File (If DNS doesn't work)**
1. Download HTML verification file
2. Contact Manus support to upload to your site
3. Click "Verify" in Google Search Console

### ✅ Step 6: Submit Sitemap

1. **In Google Search Console:**
   - Click "Sitemaps" (left menu)
   - Click "Add/test sitemap"

2. **Enter sitemap URL:**
   ```
   https://www.gkbuilders.services/sitemap.xml
   ```

3. **Click:** "Submit"

4. **Wait 24-48 hours** for Google to crawl and index

---

## 🔵 Bing Webmaster Setup (5 minutes)

### ✅ Step 7: Add to Bing Webmaster Tools

1. **Go to:** https://www.bing.com/webmasters
2. **Sign in** with Microsoft account (create if needed)
3. **Click:** "Add a site"
4. **Enter:** `https://www.gkbuilders.services`
5. **Click:** "Add"

### ✅ Step 8: Verify & Submit Sitemap

1. **Bing will auto-detect sitemap** (usually)
2. If not, manually add:
   - Click "Sitemaps"
   - Enter: `https://www.gkbuilders.services/sitemap.xml`
   - Click "Submit"

---

## ✅ Final Verification Checklist

**After 24-48 hours, verify everything:**

- [ ] Domain resolves: `https://www.gkbuilders.services` ✓
- [ ] SSL works: Green lock icon visible ✓
- [ ] robots.txt accessible ✓
- [ ] sitemap.xml accessible ✓
- [ ] Google Search Console: Property verified ✓
- [ ] Google Search Console: Sitemap submitted ✓
- [ ] Bing Webmaster: Property verified ✓
- [ ] Bing Webmaster: Sitemap submitted ✓

---

## 📊 Monitor Progress

**Week 1-2:**
- Check Google Search Console daily
- Look for "Discovered" pages
- Monitor for any errors

**Week 2-4:**
- Pages should start appearing as "Indexed"
- Search for your keywords on Google
- Check if website appears in results

**Week 4+:**
- Monitor keyword rankings
- Check search traffic
- Fix any issues that appear

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Domain doesn't load | Wait 24-48 hours for DNS propagation |
| No green lock icon | Check SSL in Manus Dashboard |
| Google Search Console won't verify | Try DNS method instead of HTML file |
| Pages not indexed | Resubmit sitemap, wait 2-4 weeks |
| Manus URL in search results | Add to Google Search Console and remove from index |

---

## 📞 Need Help?

- **Manus Support:** https://help.manus.im
- **GoDaddy Support:** https://www.godaddy.com/help
- **Google Search Console Help:** https://support.google.com/webmasters

---

## 🎯 Expected Timeline

| Timeline | What Happens |
|----------|--------------|
| **Immediately** | Domain setup in Manus |
| **24-48 hours** | DNS propagation complete, domain accessible |
| **24-48 hours** | Google Search Console verification |
| **1-2 weeks** | Pages discovered by Google |
| **2-4 weeks** | Pages indexed and appearing in search results |
| **4-8 weeks** | Ranking for main keywords |

---

## 💡 Pro Tips

1. **Add Google Analytics** to track visitor behavior
2. **Optimize content** with keywords: "construction contractor Rishikesh"
3. **Get backlinks** from local directories
4. **Post regularly** to keep content fresh
5. **Monitor rankings** with free tools like Google Search Console

---

**Status:** Ready to deploy ✨  
**Last Updated:** April 3, 2026  
**Cost:** FREE
