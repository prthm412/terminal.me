const fs = require('fs')
const path = require('path')

const files = [
  'src/components/portfolio-app.jsx',
  'src/components/portfolio-bg.jsx',
  'src/components/portfolio-boot.jsx',
  'src/components/portfolio-components.jsx',
  'src/components/portfolio-cursor.jsx',
  'src/components/portfolio-projects.jsx',
  'src/components/portfolio-terminal.jsx',
]

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${filePath}`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf8')

  // Skip if React is already imported
  if (content.includes("import React") || content.includes("from 'react'") || content.includes('from "react"')) {
    console.log(`SKIP (already has React import): ${filePath}`)
    return
  }

  // Add React import at the very top
  content = `import React, { useState, useEffect, useRef, useCallback } from 'react'\n` + content

  fs.writeFileSync(fullPath, content, 'utf8')
  console.log(`FIXED: ${filePath}`)
})

console.log('\nDone. Run npm run dev again.')
