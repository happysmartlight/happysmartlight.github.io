import base64
import os
import http.server
import socketserver
import threading
import time

PORT = 8999
SAVED = False

def embed_logo_in_svg():
    # 1. Read PNG logo and convert to base64
    logo_path = os.path.join('public', 'android-chrome-192x192.png')
    with open(logo_path, 'rb') as logo_file:
        base64_logo = base64.b64encode(logo_file.read()).decode('utf-8')
    
    # 2. Define the SVG template with base64 embedded logo in two places and adjusted coordinates
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Fonts -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;800&amp;family=JetBrains+Mono:wght@400;700&amp;display=swap');
      .title {{
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }}
      .subtitle {{
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 500;
        letter-spacing: 0.05em;
      }}
      .mono {{
        font-family: 'JetBrains Mono', monospace;
      }}
      .glow-pink {{
        filter: drop-shadow(0 0 8px #ff2d95) drop-shadow(0 0 20px rgba(255, 45, 149, 0.4));
      }}
      .glow-blue {{
        filter: drop-shadow(0 0 8px #00e5ff) drop-shadow(0 0 20px rgba(0, 229, 255, 0.4));
      }}
      .glow-purple {{
        filter: drop-shadow(0 0 8px #a855f7) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4));
      }}
      .grid-lines {{
        stroke: rgba(255, 255, 255, 0.025);
        stroke-width: 1;
      }}
    </style>

    <!-- Gradients -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020204" />
      <stop offset="50%" stop-color="#070716" />
      <stop offset="100%" stop-color="#0c001a" />
    </linearGradient>
    
    <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff2d95" />
      <stop offset="50%" stop-color="#d946ef" />
      <stop offset="100%" stop-color="#00e5ff" />
    </linearGradient>
    
    <linearGradient id="pink-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff2d95" />
      <stop offset="100%" stop-color="#00e5ff" />
    </linearGradient>
    
    <radialGradient id="glow-pink-rad" cx="20%" cy="85%" r="60%">
      <stop offset="0%" stop-color="#ff2d95" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#ff2d95" stop-opacity="0" />
    </radialGradient>
    
    <radialGradient id="glow-blue-rad" cx="80%" cy="15%" r="65%">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#00e5ff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)" />
  
  <!-- Glowing Background Orbs -->
  <circle cx="200" cy="530" r="400" fill="url(#glow-pink-rad)" />
  <circle cx="1000" cy="100" r="450" fill="url(#glow-blue-rad)" />
  
  <!-- Cyber Grid Pattern -->
  <g class="grid-lines">
    <!-- Horizontal lines -->
    <path d="M0,50 L1200,50 M0,100 L1200,100 M0,150 L1200,150 M0,200 L1200,200 M0,250 L1200,250 M0,300 L1200,300 M0,350 L1200,350 M0,400 L1200,400 M0,450 L1200,450 M0,500 L1200,500 M0,550 L1200,550 M0,600 L1200,600" />
    <!-- Vertical lines -->
    <path d="M100,0 L100,630 M200,0 L200,630 M300,0 L300,630 M400,0 L400,630 M500,0 L500,630 M600,0 L600,630 M700,0 L700,630 M800,0 L800,630 M900,0 L900,630 M1000,0 L1000,630 M1100,0 L1100,630" />
  </g>
  
  <!-- Futuristic Circuit Lines (Background Detail) -->
  <g opacity="0.12" stroke="url(#pink-blue)" stroke-width="1.5" fill="none">
    <path d="M 120,80 L 180,140 L 320,140 L 370,190 L 370,290 L 420,340" />
    <circle cx="120" cy="80" r="3" fill="#ff2d95" />
    <circle cx="420" cy="340" r="3" fill="#00e5ff" />
    
    <path d="M 1080,550 L 1020,490 L 880,490 L 830,440 L 830,340 L 780,290" />
    <circle cx="1080" cy="550" r="3" fill="#00e5ff" />
    <circle cx="780" cy="290" r="3" fill="#ff2d95" />
  </g>

  <!-- Background PCB & Square Waves (Faint Background Detail) -->
  <g opacity="0.06" stroke="url(#pink-blue)" fill="none">
    <!-- Parallel PCB tracks -->
    <path d="M 80,130 L 400,130 L 440,170 L 440,230 L 480,270" stroke-width="1" />
    <path d="M 80,140 L 395,140 L 430,175 L 430,225 L 470,265" stroke-width="1" />
    <path d="M 80,150 L 390,150 L 420,180 L 420,220 L 460,260" stroke-width="1" />
    <path d="M 80,160 L 385,160 L 410,185 L 410,215 L 450,255" stroke-width="1" />
    
    <!-- PCB Via circles/solder pads -->
    <circle cx="80" cy="130" r="2" fill="#00e5ff" />
    <circle cx="80" cy="140" r="2" fill="#ff2d95" />
    <circle cx="80" cy="150" r="2" fill="#00e5ff" />
    <circle cx="80" cy="160" r="2" fill="#ff2d95" />
    
    <!-- Microchip representation on background -->
    <rect x="470" y="240" width="40" height="60" rx="4" stroke="#00e5ff" stroke-width="1" />
    <!-- Chip pins -->
    <path d="M 465,250 L 470,250 M 465,260 L 470,260 M 465,270 L 470,270 M 465,280 L 470,280 M 465,290 L 470,290" stroke="#ff2d95" stroke-width="1" />
    <path d="M 510,250 L 515,250 M 510,260 L 515,260 M 510,270 L 515,270 M 510,280 L 515,280 M 510,290 L 515,290" stroke="#00e5ff" stroke-width="1" />

    <!-- High-Speed Square Signal Waves (Xung vuông điện tử) -->
    <!-- Signal Wave 1 (Digital Pulse) -->
    <path d="M 80,100 L 100,100 L 100,80 L 120,80 L 120,100 L 160,100 L 160,80 L 180,80 L 180,100 L 220,100 L 220,80 L 240,80 L 240,100 L 300,100 L 300,80 L 320,80 L 320,100 L 380,100" stroke="#00e5ff" stroke-width="1.2" />
    <text x="80" y="72" font-family="'JetBrains Mono', monospace" font-size="8" fill="#00e5ff" font-weight="bold">CLK_DATA_BUS [A0]</text>
    
    <!-- Signal Wave 2 (Digital Pulse - phase shifted) -->
    <path d="M 80,180 L 120,180 L 120,195 L 140,195 L 140,180 L 190,180 L 190,195 L 210,195 L 210,180 L 270,180 L 270,195 L 290,195 L 290,180 L 350,180 L 350,195 L 370,195 L 370,180 L 380,180" stroke="#ff2d95" stroke-width="1.2" />
    <text x="80" y="210" font-family="'JetBrains Mono', monospace" font-size="8" fill="#ff2d95" font-weight="bold">HSL_SYNC_STREAM [DDP]</text>
    
    <!-- Additional complex branching tracks -->
    <path d="M 320,140 L 320,100" stroke-width="0.8" stroke-dasharray="2 2" />
    <path d="M 180,140 L 180,80" stroke-width="0.8" stroke-dasharray="2 2" />
  </g>

  <!-- Glowing Border -->
  <rect x="15" y="15" width="1170" height="600" rx="20" fill="none" stroke="url(#pink-blue)" stroke-width="1.5" stroke-opacity="0.3" />
  <rect x="20" y="20" width="1160" height="590" rx="16" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.08" />

  <!-- Corner Brackets -->
  <g stroke="url(#pink-blue)" stroke-width="3.5" fill="none" class="glow-pink" stroke-linecap="round">
    <!-- Top-Left -->
    <path d="M 35,65 L 35,35 L 65,35" />
    <!-- Top-Right -->
    <path d="M 1135,35 L 1165,35 L 1165,65" />
    <!-- Bottom-Left -->
    <path d="M 35,565 L 35,595 L 65,595" />
    <!-- Bottom-Right -->
    <path d="M 1135,595 L 1165,595 L 1165,565" />
  </g>

  <!-- Visual Central Hexagon Graphics (Right Side) - PLACED FIRST for correct background layer ordering -->
  <g transform="translate(1000, 310)">
    <!-- Glowing background elements -->
    <circle cx="0" cy="0" r="150" fill="url(#bg-grad)" opacity="0.6" stroke="url(#pink-blue)" stroke-width="1" stroke-opacity="0.2" />
    
    <!-- Outer Rotated Hexagon -->
    <polygon points="0,-125 108,-62 108,62 0,125 -108,62 -108,-62" fill="none" stroke="url(#pink-blue)" stroke-width="2.5" class="glow-pink" transform="rotate(15)" />
    
    <!-- Inner Hexagon -->
    <polygon points="0,-100 86,-50 86,50 0,100 -86,50 -86,-50" fill="none" stroke="#00e5ff" stroke-width="1.5" stroke-dasharray="10, 6" class="glow-blue" transform="rotate(-30)" />

    <!-- Core chip mockup representation -->
    <rect x="-42" y="-42" width="84" height="84" rx="14" fill="#060612" stroke="url(#pink-blue)" stroke-width="2" class="glow-purple" />
    
    <!-- Inner design of the chip -->
    <path d="M-22,-22 L22,-22 L22,22 L-22,22 Z" fill="none" stroke="#00e5ff" stroke-width="1" opacity="0.4" />
    
    <!-- Micro controller lines coming out of chip -->
    <path d="M-42,-20 L-58,-20 M-42,0 L-58,0 M-42,20 L-58,20" stroke="#ff2d95" stroke-width="1.5" stroke-linecap="round" />
    <path d="M42,-20 L58,-20 M42,0 L58,0 M42,20 L58,20" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round" />
    <path d="M-20,-42 L-20,-58 M0,-42 L0,-58 M20,-42 L20,-58" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round" />
    <path d="M-20,42 L-20,58 M0,42 L0,58 M20,42 L20,58" stroke="#ff2d95" stroke-width="1.5" stroke-linecap="round" />

    <!-- Center HSL Logo Image (Embedded inside CPU Core Chip) -->
    <image href="data:image/png;base64,{base64_logo}" x="-28" y="-28" width="56" height="56" />
    
    <!-- Orbiting dots -->
    <circle cx="150" cy="0" r="5" fill="#ff2d95" class="glow-pink" transform="rotate(45)" />
    <circle cx="-150" cy="0" r="5" fill="#00e5ff" class="glow-blue" transform="rotate(45)" />
  </g>


  <!-- Brand Title & Subtitle (Left Side) - PLACED SECOND to overlay cleanly over background hexagons -->
  <g transform="translate(80, 220)">
    <!-- Small tech indicator -->
    <text x="0" y="0" class="mono" font-size="14" fill="#00e5ff" letter-spacing="4" font-weight="bold">// NEXT-GEN SMART LED SYSTEM</text>
    
    <!-- Main Title -->
    <text x="0" y="60" class="title" font-size="54" fill="#ffffff" font-weight="800">
      HAPPY SMART LIGHT
    </text>
    <text x="0" y="115" class="title" font-size="34" fill="url(#brand-grad)" font-weight="800">
      ARGB HSL ECOSYSTEM
    </text>
    
    <!-- Short Description -->
    <text x="0" y="170" font-family="'Inter', sans-serif" font-size="18" fill="#94a3b8" font-weight="300">
      Hệ sinh thái điều khiển LED chuyên nghiệp, tốc độ cao, độ trễ cực thấp tại Việt Nam.
    </text>
    <text x="0" y="200" font-family="'Inter', sans-serif" font-size="18" fill="#94a3b8" font-weight="300">
      Tương thích hoàn hảo với xLights, LedFx Engine và các dự án thiết lập LED phức tạp.
    </text>
  </g>

  <!-- Badge / Tags Row (Left Side) -->
  <g transform="translate(80, 475)">
    <!-- Badge 1: ARGB HSL Protocol -->
    <g transform="translate(0, 0)">
      <rect width="210" height="44" rx="8" fill="rgba(255, 45, 149, 0.08)" stroke="#ff2d95" stroke-width="1.2" stroke-opacity="0.4" />
      <text x="105" y="27" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#ff2d95" text-anchor="middle">⚡ Giao thức ARGB HSL</text>
    </g>
    <!-- Badge 2: 60 FPS Rendering -->
    <g transform="translate(225, 0)">
      <rect width="210" height="44" rx="8" fill="rgba(0, 229, 255, 0.08)" stroke="#00e5ff" stroke-width="1.2" stroke-opacity="0.4" />
      <text x="105" y="27" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#00e5ff" text-anchor="middle">🚀 HDR Stream 60 FPS</text>
    </g>
    <!-- Badge 3: xLights DDP Sync -->
    <g transform="translate(450, 0)">
      <rect width="210" height="44" rx="8" fill="rgba(168, 85, 247, 0.08)" stroke="#a855f7" stroke-width="1.2" stroke-opacity="0.4" />
      <text x="105" y="27" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#c084fc" text-anchor="middle">🎬 Đồng bộ xLights DDP</text>
    </g>
  </g>
  
</svg>"""

    svg_path = os.path.join('public', 'og-image.svg')
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print("Embedded logo into public/og-image.svg successfully!")

class RenderHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        global SAVED
        if self.path == '/save':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            data_url = post_data.decode('utf-8')
            header, base64_data = data_url.split(',')
            binary_data = base64.b64decode(base64_data)
            
            output_path = os.path.join(os.path.dirname(__file__), 'public', 'og-image.png')
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'wb') as f:
                f.write(binary_data)
            
            print(f"Successfully saved rendered PNG to {output_path}")
            SAVED = True
            
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(b"OK")
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.end_headers()

    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            
            svg_path = os.path.join(os.path.dirname(__file__), 'public', 'og-image.svg')
            with open(svg_path, 'r', encoding='utf-8') as f:
                svg_content = f.read()
                
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <title>SVG Renderer</title>
                <style>
                    body {{
                        margin: 0;
                        background: #020204;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        color: white;
                        font-family: sans-serif;
                    }}
                    canvas {{
                        border: 1px solid #333;
                    }}
                </style>
            </head>
            <body>
                <h1>Rendering SVG to PNG...</h1>
                <div id="svg-container" style="display: none;">{svg_content}</div>
                <canvas id="canvas" width="1200" height="630"></canvas>
                <p id="status">Converting...</p>
                <script>
                    window.addEventListener('load', function() {{
                        const svgElement = document.querySelector('#svg-container svg');
                        const canvas = document.getElementById('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        document.fonts.ready.then(function() {{
                            setTimeout(renderAndPost, 2000); // 2s for all images & fonts
                        }});

                        function renderAndPost() {{
                            const svgString = new XMLSerializer().serializeToString(svgElement);
                            const svgBlob = new Blob([svgString], {{type: 'image/svg+xml;charset=utf-8'}});
                            const URL = window.URL || window.webkitURL || window;
                            const blobURL = URL.createObjectURL(svgBlob);
                            
                            const image = new Image();
                            image.onload = function() {{
                                ctx.drawImage(image, 0, 0, 1200, 630);
                                const pngDataUrl = canvas.toDataURL('image/png');
                                
                                document.getElementById('status').innerText = 'Posting back to server...';
                                
                                fetch('/save', {{
                                    method: 'POST',
                                    headers: {{
                                        'Content-Type': 'text/plain'
                                    }},
                                    body: pngDataUrl
                                }}).then(res => {{
                                    if(res.ok) {{
                                        document.getElementById('status').innerText = 'Done! You can close this page.';
                                        console.log('Successfully saved.');
                                    }} else {{
                                        document.getElementById('status').innerText = 'Failed to save.';
                                    }}
                                }}).catch(err => {{
                                    document.getElementById('status').innerText = 'Error: ' + err.message;
                                }});
                            }};
                            image.src = blobURL;
                        }}
                    }});
                </script>
            </body>
            </html>
            """
            self.wfile.write(html_content.encode('utf-8'))
        else:
            super().do_GET()

def run_server():
    with socketserver.TCPServer(("", PORT), RenderHandler) as httpd:
        print(f"Server started at port {PORT}")
        while not SAVED:
            httpd.handle_request()
        print("Server stopping...")

if __name__ == '__main__':
    # Embed the logo into SVG
    embed_logo_in_svg()
    
    # Start server thread
    t = threading.Thread(target=run_server)
    t.daemon = True
    t.start()
    
    # Wait for server to start
    time.sleep(1)
    
    print(f"Server is listening. Waiting up to 300 seconds for client...")
    # We wait up to 300 seconds for it to save
    for _ in range(300):
        if SAVED:
            break
        time.sleep(1)
    
    if SAVED:
        print("Image successfully rendered and saved.")
    else:
        print("Timed out waiting for render.")
