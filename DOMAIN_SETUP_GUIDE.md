# GK Builders - Domain Setup & SEO Configuration Guide

**Status:** Website running on Manus with custom domain `www.gkbuilders.services`  
**Goal:** Ensure only `www.gkbuilders.services` appears in Google search results (not Manus URL)  
**Cost:** FREE - No paid plans needed

---

## 📋 Table of Contents

1. [Current Setup Status](#current-setup-status)
2. [Manus Dashboard Configuration](#manus-dashboard-configuration)
3. [GoDaddy DNS Setup](#godaddy-dns-setup)
4. [Google Search Console Setup](#google-search-console-setup)
5. [Bing Webmaster Tools Setup](#bing-webmaster-tools-setup)
6. [SEO Verification Checklist](#seo-verification-checklist)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Current Setup Status

### Website Information
- **Website Name:** GK Builders - Civil Contractor
- **Primary Domain:** `www.gkbuilders.services`
- **Hosting Platform:** Manus (Free)
- **Manus URL:** `gkbuilds-hr3vcc76.manus.space` (Should NOT appear in search results)

### SEO Configuration
- ✅ **Canonical URL:** `https://www.gkbuilders.services`
- ✅ **robots.txt:** Configured to allow all search engines
- ✅ **sitemap.xml:** All pages included
- ✅ **Meta Tags:** SEO-optimized
- ✅ **Schema.org:** Local Business structured data
- ✅ **Open Graph Tags:** Social sharing ready
- ✅ **SSL Certificate:** Active (HTTPS)

---

## 🎯 Manus Dashboard Configuration

### Step 1: Verify Domain Connection in Manus

1. **Open Manus Dashboard**
   - Go to your project: https://manus.im
   - Select "GK Builders" project

2. **Navigate to Settings → Domains**
   - Click on **Settings** icon in Management UI
   - Select **Domains** tab

3. **Verify Domain Status**
   - Look for `www.gkbuilders.services`
   - Status should show: **Connected** or **Active**
   - SSL Certificate should show: **Valid** or **Active**

4. **Check Domain Binding**
   - Verify that the domain is bound to your Manus project
   - If not showing, you may need to add it:
     - Click **Add Domain**
     - Enter: `www.gkbuilders.services`
     - Follow the DNS configuration steps

### Step 2: Configure Search Engine Visibility

1. **In Manus Settings → General**
   - Ensure **Visibility** is set to **Public**
   - This allows search engines to crawl your site

2. **In Manus Settings → Domains**
   - Verify that your custom domain is the **primary domain**
   - The Manus URL should be secondary or hidden from search results

---

## 🔧 GoDaddy DNS Setup

### What You Need
- GoDaddy account access
- Your domain: `gkbuilders.services`
- Manus DNS information (provided by Manus)

### DNS Configuration Steps

#### Option A: Using A Record (Most Common)

1. **Log in to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in with your account

2. **Navigate to DNS Settings**
   - Go to **My Products**
   - Find your domain: `gkbuilders.services`
   - Click **Manage DNS** or **DNS Settings**

3. **Add/Update A Record for www**
   ```
   Type:     A
   Name:     www
   Value:    [Get from Manus - usually an IP address]
   TTL:      3600 (or 1 hour)
   ```

4. **Update Root Domain (Optional but Recommended)**
   ```
   Type:     A
   Name:     @ (or leave blank)
   Value:    [Same as www - Manus IP]
   TTL:      3600
   ```

5. **Save Changes**
   - Click **Save** button
   - Changes may take 24-48 hours to propagate

#### Option B: Using CNAME Record (If Manus Provides)

1. **Add CNAME Record**
   ```
   Type:     CNAME
   Name:     www
   Value:    [Manus CNAME - usually something like gkbuilds-hr3vcc76.manus.space]
   TTL:      3600
   ```

2. **Save Changes**

### Verify DNS Configuration

**Test 1: Check DNS Propagation**
```bash
# On Mac/Linux terminal:
nslookup www.gkbuilders.services

# Or use online tool:
https://www.whatsmydns.net/
```

**Test 2: Visit Your Domain**
- Open browser: `https://www.gkbuilders.services`
- Should load your website
- Check SSL certificate (green lock icon)

**Test 3: Check robots.txt**
- Visit: `https://www.gkbuilders.services/robots.txt`
- Should show robots.txt content

---

## 🔍 Google Search Console Setup

### Why This Matters
- Tells Google about your website
- Shows how your site appears in search results
- Helps you rank better for "construction contractor Rishikesh"

### Setup Steps

#### Step 1: Create Google Search Console Account

1. **Go to Google Search Console**
   - URL: https://search.google.com/search-console

2. **Sign in with Google Account**
   - Use your Gmail account
   - Create one if you don't have it

#### Step 2: Add Your Property

1. **Click "Add Property"**
   - Select **URL prefix** option
   - Enter: `https://www.gkbuilders.services`
   - Click **Continue**

#### Step 3: Verify Ownership

**Method 1: HTML File (Easiest)**
1. Download the HTML verification file
2. Contact Manus support or use Management UI to upload to root
3. Click **Verify** in Google Search Console

**Method 2: DNS Record (Recommended)**
1. Google will provide a DNS TXT record
2. Add to GoDaddy DNS settings:
   ```
   Type:     TXT
   Name:     @ (root domain)
   Value:    [Google's verification code]
   TTL:      3600
   ```
3. Wait 24 hours for DNS propagation
4. Click **Verify** in Google Search Console

**Method 3: Google Analytics**
- If you have Google Analytics connected, you can verify through it

#### Step 4: Submit Sitemap

1. **In Google Search Console Dashboard**
   - Go to **Sitemaps** section
   - Click **Add/test sitemap**

2. **Enter Sitemap URL**
   ```
   https://www.gkbuilders.services/sitemap.xml
   ```

3. **Submit**
   - Google will crawl and index your pages

#### Step 5: Monitor Search Performance

1. **Check Performance Report**
   - See which keywords you're ranking for
   - Track clicks and impressions
   - Monitor average position

2. **Check Coverage**
   - Verify all pages are indexed
   - Fix any errors or warnings

3. **Check Mobile Usability**
   - Ensure site is mobile-friendly
   - Fix any mobile issues

---

## 🔵 Bing Webmaster Tools Setup

### Why This Matters
- Bing powers Yahoo, DuckDuckGo, and other search engines
- Helps you rank in Bing search results
- Complements Google Search Console

### Setup Steps

#### Step 1: Create Bing Webmaster Account

1. **Go to Bing Webmaster Tools**
   - URL: https://www.bing.com/webmasters

2. **Sign in with Microsoft Account**
   - Create one if needed (free)

#### Step 2: Add Your Site

1. **Click "Add a site"**
   - Enter: `https://www.gkbuilders.services`
   - Click **Add**

#### Step 3: Verify Ownership

**Method 1: XML Sitemap (Easiest)**
1. Bing will auto-detect your sitemap
2. If not, manually add: `https://www.gkbuilders.services/sitemap.xml`
3. Click **Submit**

**Method 2: DNS Record**
1. Add Bing's TXT record to GoDaddy DNS
2. Wait for verification

#### Step 4: Submit Sitemap

1. **Go to Sitemaps section**
2. **Add sitemap**
   ```
   https://www.gkbuilders.services/sitemap.xml
   ```
3. **Submit**

---

## ✅ SEO Verification Checklist

Use this checklist to verify everything is working:

### Domain & SSL
- [ ] Domain `www.gkbuilders.services` resolves correctly
- [ ] HTTPS (green lock icon) works
- [ ] Redirects from `gkbuilders.services` to `www.gkbuilders.services`
- [ ] Manus URL doesn't appear in search results

### robots.txt & sitemap.xml
- [ ] `https://www.gkbuilders.services/robots.txt` is accessible
- [ ] `https://www.gkbuilders.services/sitemap.xml` is accessible
- [ ] Both files have correct content

### Meta Tags & SEO
- [ ] Page title includes "GK Builders" and keywords
- [ ] Meta description is present and relevant
- [ ] Canonical URL is set to `https://www.gkbuilders.services`
- [ ] Open Graph tags are present
- [ ] Schema.org structured data is valid

### Search Console
- [ ] Google Search Console shows property as verified
- [ ] Sitemap is submitted and indexed
- [ ] No critical errors in Coverage report
- [ ] Mobile usability is good

### Bing Webmaster
- [ ] Bing Webmaster Tools shows property as verified
- [ ] Sitemap is submitted
- [ ] Site is crawlable

### Content & Keywords
- [ ] Homepage mentions "construction contractor Rishikesh"
- [ ] Services page has relevant keywords
- [ ] Contact information is visible
- [ ] WhatsApp integration is working

---

## 🔧 Troubleshooting

### Issue 1: Domain Not Resolving

**Symptoms:**
- `www.gkbuilders.services` shows "Cannot reach this website"
- DNS timeout errors

**Solutions:**
1. **Check GoDaddy DNS Settings**
   - Verify A record or CNAME is correct
   - Check TTL value (should be 3600)
   - Wait 24-48 hours for DNS propagation

2. **Verify Manus Configuration**
   - Check if domain is added in Manus Dashboard
   - Ensure domain is marked as primary
   - Contact Manus support if needed

3. **Test DNS Propagation**
   - Use: https://www.whatsmydns.net/
   - Enter: `www.gkbuilders.services`
   - Should show Manus IP address

### Issue 2: SSL Certificate Not Working

**Symptoms:**
- Browser shows "Not Secure" warning
- HTTPS doesn't work

**Solutions:**
1. **Check Manus SSL Status**
   - Go to Manus Dashboard → Settings → Domains
   - Verify SSL certificate is "Active" or "Valid"
   - If not, regenerate certificate

2. **Wait for Certificate Issuance**
   - SSL certificates take 5-30 minutes to issue
   - Refresh browser cache (Ctrl+Shift+Delete)

3. **Check Domain Verification**
   - Ensure domain is properly verified in Manus
   - Re-verify if needed

### Issue 3: Manus URL Appearing in Search Results

**Symptoms:**
- Google search shows `gkbuilds-hr3vcc76.manus.space` instead of `www.gkbuilders.services`

**Solutions:**
1. **Update robots.txt**
   - Add to robots.txt:
   ```
   Host: https://www.gkbuilders.services
   ```

2. **Set Canonical URL**
   - Ensure all pages have:
   ```html
   <link rel="canonical" href="https://www.gkbuilders.services" />
   ```

3. **Google Search Console**
   - Add both URLs as properties
   - Set preferred domain to `www.gkbuilders.services`
   - Remove Manus URL from index

4. **Remove Old URL**
   - In Google Search Console
   - Go to **Settings** → **Remove URLs**
   - Remove `gkbuilds-hr3vcc76.manus.space` from index

### Issue 4: Pages Not Indexed

**Symptoms:**
- Google Search Console shows "Discovered but not indexed"
- Pages don't appear in search results

**Solutions:**
1. **Check robots.txt**
   - Verify `Allow: /` is set
   - Ensure `/api/` is disallowed (not `/`)

2. **Resubmit Sitemap**
   - In Google Search Console
   - Go to Sitemaps
   - Click **Request indexing** for each URL

3. **Check Content Quality**
   - Ensure pages have enough content (300+ words)
   - Add relevant keywords naturally
   - Include images with alt text

4. **Wait for Crawling**
   - Google crawls new sites slowly
   - Can take 2-4 weeks for full indexing
   - Check back in Search Console regularly

### Issue 5: Poor Mobile Performance

**Symptoms:**
- Google Search Console shows mobile usability issues
- Site is slow on mobile

**Solutions:**
1. **Test Mobile Usability**
   - Use: https://search.google.com/test/mobile-friendly
   - Enter your URL
   - Fix any reported issues

2. **Optimize Images**
   - Compress images to reduce file size
   - Use modern formats (WebP)
   - Add responsive images

3. **Improve Page Speed**
   - Use: https://pagespeed.web.dev/
   - Follow recommendations
   - Minimize CSS/JavaScript

---

## 📞 Support & Resources

### Manus Support
- **Website:** https://manus.im
- **Help Center:** https://help.manus.im
- **Contact:** support@manus.im

### Google Resources
- **Google Search Console Help:** https://support.google.com/webmasters
- **SEO Starter Guide:** https://developers.google.com/search/docs/beginner/seo-starter-guide

### Bing Resources
- **Bing Webmaster Help:** https://www.bing.com/webmasters/help
- **Bing SEO Guide:** https://www.bing.com/webmasters/help/webmaster-guidelines-31e81b65

### GoDaddy Support
- **GoDaddy Help:** https://www.godaddy.com/help
- **DNS Management:** https://www.godaddy.com/help/manage-dns-680

---

## 📝 Next Steps (Action Items)

1. **Week 1:**
   - [ ] Verify domain in Manus Dashboard
   - [ ] Check GoDaddy DNS configuration
   - [ ] Test domain accessibility

2. **Week 2:**
   - [ ] Add property to Google Search Console
   - [ ] Verify ownership (DNS method recommended)
   - [ ] Submit sitemap

3. **Week 3:**
   - [ ] Add property to Bing Webmaster Tools
   - [ ] Submit sitemap to Bing
   - [ ] Monitor search performance

4. **Week 4+:**
   - [ ] Check Google Search Console for indexing status
   - [ ] Monitor keyword rankings
   - [ ] Fix any reported issues
   - [ ] Optimize content based on search data

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ `https://www.gkbuilders.services` loads with green lock icon  
✅ Google Search Console shows property as verified  
✅ Sitemap is submitted and pages are indexed  
✅ Searching "construction contractor Rishikesh" shows your website  
✅ Manus URL doesn't appear in search results  
✅ Mobile usability is good  
✅ Page speed is acceptable  

---

**Last Updated:** April 3, 2026  
**Status:** Ready for deployment  
**Cost:** FREE ✨
