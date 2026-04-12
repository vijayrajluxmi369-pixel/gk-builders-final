# Manus Domain Configuration - GK Builders

**Your Website Status:**
- ✅ Website running on Manus (Free hosting)
- ✅ Custom domain: `www.gkbuilders.services` (Your own domain)
- ✅ All features working perfectly
- ✅ No paid plans needed

---

## 📍 Current Setup

| Item | Status | Details |
|------|--------|---------|
| **Hosting** | ✅ Active | Manus (Free) |
| **Custom Domain** | ✅ Connected | www.gkbuilders.services |
| **Manus URL** | ✅ Active | gkbuilds-hr3vcc76.manus.space |
| **SSL Certificate** | ✅ Active | HTTPS enabled |
| **Database** | ✅ Active | MySQL/TiDB |
| **Backend Server** | ✅ Active | Express + tRPC |
| **Frontend** | ✅ Active | React + Vite |

---

## 🎯 What You Need to Do

### Option 1: Use Manus Dashboard (Easiest)

**Step 1: Open Manus Dashboard**
```
1. Go to: https://manus.im
2. Sign in with your account
3. Select "GK Builders" project
```

**Step 2: Go to Settings → Domains**
```
1. Click Settings icon (⚙️) in Management UI
2. Select "Domains" tab
3. Look for "www.gkbuilders.services"
```

**Step 3: Verify Domain Status**
- Status should show: **Connected** or **Active**
- SSL should show: **Valid** or **Active**
- If not showing, click **Add Domain** and follow instructions

**Step 4: Check DNS Instructions**
- Manus provides DNS configuration steps
- Copy the DNS values from Manus
- Add them to GoDaddy (see below)

---

### Option 2: Manual GoDaddy DNS Setup

**If Manus Dashboard doesn't show DNS instructions:**

**Step 1: Get DNS Info from Manus**
- Contact Manus support: https://help.manus.im
- Ask for: "DNS A record or CNAME for www.gkbuilders.services"
- They'll give you something like:
  ```
  IP Address: 123.45.67.89
  OR
  CNAME: gkbuilds-hr3vcc76.manus.space
  ```

**Step 2: Update GoDaddy DNS**
```
1. Go to: https://www.godaddy.com
2. Sign in with your account
3. Find domain: gkbuilders.services
4. Click "Manage DNS"
```

**Step 3: Add A Record (if using IP)**
```
Type:     A
Name:     www
Value:    [IP from Manus]
TTL:      3600
```

**Step 4: OR Add CNAME Record (if using CNAME)**
```
Type:     CNAME
Name:     www
Value:    gkbuilds-hr3vcc76.manus.space
TTL:      3600
```

**Step 5: Save Changes**
- Click "Save"
- Wait 24-48 hours for DNS propagation

---

## ✅ Verification Steps

### Test 1: Domain Accessibility
```bash
# Open in browser:
https://www.gkbuilders.services

# Should see:
✓ Your website loads
✓ Green lock icon (HTTPS)
✓ No "Not Secure" warning
```

### Test 2: robots.txt
```bash
# Open in browser:
https://www.gkbuilders.services/robots.txt

# Should see:
✓ robots.txt content displayed
```

### Test 3: sitemap.xml
```bash
# Open in browser:
https://www.gkbuilders.services/sitemap.xml

# Should see:
✓ XML sitemap with all pages
```

### Test 4: DNS Propagation
```bash
# Use online tool:
https://www.whatsmydns.net/

# Enter: www.gkbuilders.services
# Should show: Manus IP address
```

---

## 🔍 Search Engine Configuration

### Google Search Console Setup

**Why:** Tell Google about your website so it appears in search results

**Steps:**
1. Go to: https://search.google.com/search-console
2. Sign in with Google account
3. Click "Add Property"
4. Enter: `https://www.gkbuilders.services`
5. Verify ownership (DNS method recommended)
6. Submit sitemap: `https://www.gkbuilders.services/sitemap.xml`

**Time to Index:** 2-4 weeks

### Bing Webmaster Tools Setup

**Why:** Help Bing index your website

**Steps:**
1. Go to: https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. Add site: `https://www.gkbuilders.services`
4. Verify ownership
5. Submit sitemap

---

## 📊 SEO Configuration Already Done

Your website already has:

✅ **robots.txt**
- Allows all search engines
- Specifies sitemap location
- Disallows /api/ (backend)

✅ **sitemap.xml**
- All pages included
- Proper priorities set
- Last modified dates

✅ **Meta Tags**
- Page title with keywords
- Meta description
- Keywords for SEO
- Open Graph tags for social sharing

✅ **Canonical URL**
- Set to: `https://www.gkbuilders.services`
- Prevents duplicate content issues

✅ **Schema.org Structured Data**
- Local Business schema
- Contact information
- Service types

✅ **SSL Certificate**
- HTTPS enabled
- Green lock icon
- Secure connection

---

## 🚀 Timeline

| When | What Happens |
|------|--------------|
| **Now** | Domain setup in Manus |
| **24-48 hours** | DNS propagates, domain works |
| **Immediately** | Add to Google Search Console |
| **1-2 weeks** | Google discovers pages |
| **2-4 weeks** | Pages indexed |
| **4-8 weeks** | Ranking for keywords |

---

## 💡 Important Notes

### ⚠️ Don't Do This
- ❌ Don't delete Manus URL - it's your backup
- ❌ Don't change DNS without Manus guidance
- ❌ Don't use paid plans - everything is free
- ❌ Don't block Manus URL in robots.txt

### ✅ Do This
- ✅ Use custom domain for all links
- ✅ Keep Manus URL as backup
- ✅ Monitor Google Search Console
- ✅ Update content regularly
- ✅ Get backlinks from local directories

---

## 🆘 Troubleshooting

### Problem: Domain doesn't load
**Solution:** Wait 24-48 hours for DNS propagation

### Problem: No green lock icon
**Solution:** Check SSL status in Manus Dashboard → Settings → Domains

### Problem: Pages not indexed
**Solution:** 
1. Verify in Google Search Console
2. Resubmit sitemap
3. Wait 2-4 weeks

### Problem: Manus URL appearing in search results
**Solution:**
1. Add both URLs to Google Search Console
2. Set preferred domain to www.gkbuilders.services
3. Remove Manus URL from index

---

## 📞 Support Contacts

| Service | Contact |
|---------|---------|
| **Manus Help** | https://help.manus.im |
| **GoDaddy Support** | https://www.godaddy.com/help |
| **Google Search Console** | https://support.google.com/webmasters |
| **Bing Webmaster** | https://www.bing.com/webmasters/help |

---

## ✨ Free Features You're Getting

- ✅ Unlimited hosting on Manus
- ✅ Custom domain support
- ✅ SSL certificate (HTTPS)
- ✅ Database (MySQL/TiDB)
- ✅ Backend server (Express)
- ✅ Frontend (React)
- ✅ Email notifications
- ✅ WhatsApp integration
- ✅ Admin dashboard
- ✅ Form submissions
- ✅ No monthly fees
- ✅ No setup fees

---

## 🎉 Success Criteria

You'll know everything is working when:

✅ `https://www.gkbuilders.services` loads perfectly  
✅ Green lock icon visible  
✅ Google Search Console shows property verified  
✅ Sitemap submitted and indexed  
✅ Pages appearing in search results  
✅ Manus URL NOT in search results  
✅ Mobile site works perfectly  
✅ Forms and WhatsApp buttons working  

---

**Last Updated:** April 3, 2026  
**Status:** Ready to deploy  
**Cost:** FREE ✨
