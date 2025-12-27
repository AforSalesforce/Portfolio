import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    console.log('Starting PDF generation...');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900 });

    console.log('Navigating to page...');
    try {
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    } catch (e) {
        console.error('Error connecting to http://localhost:5173/. Ensure the dev server is running.');
        await browser.close();
        process.exit(1);
    }

    // Scroll to bottom to trigger any lazy loading or IntersectionObservers
    console.log('Scrolling page to trigger animations...');
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50); // Scroll every 50ms
        });
    });

    // Scroll back to top just in case? No, print should handle full document. 
    // But let's wait a moment for animations to settle (even though we disabled them in CSS, React might need a tick)
    await new Promise(r => setTimeout(r, 1000));

    console.log('Generating PDF...');
    await page.pdf({
        path: path.join(__dirname, '../public/resume.pdf'),
        format: 'A4',
        printBackground: true,
        scale: 0.8,
        margin: {
            top: '0mm',
            bottom: '0mm',
            left: '0mm',
            right: '0mm'
        }
    });

    await browser.close();
    console.log('PDF generated at public/resume.pdf');
})();
