<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html>
      <head>
        <title>RSS Feed | <xsl:value-of select="/rss/channel/title" /></title>
        <script src="/scripts/theme.js"></script>
        <link rel="stylesheet" href="/feed.css" />
      </head>
      <body>
        <a class="back" href="/blog">
          ← Back
        </a>
        <h1>RSS Feed | <xsl:value-of select="/rss/channel/title" /></h1>
        <hr class="divider" />
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <a href="{link}" target="_blank" rel="noopener noreferrer" class="link">
              <h2>
                <xsl:value-of select="title" />
              </h2>
              <p>
                <xsl:value-of select="description" />
              </p>
              <div class="meta">
                <span class="date">
                  <xsl:value-of select="pubDate" />
                </span>
              </div>
            </a>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
