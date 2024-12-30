document.addEventListener('DOMContentLoaded', function() {
    // Initialize markmap
    const { markmap } = window;
    const { Markmap } = markmap;

    // Style configuration for the mindmap
    const options = {
        color: '#2e7d32',  // Green color to match your theme
        nodeFont: '300 16px "Roboto", sans-serif',
        lineHeight: 1.5,
        spacingHorizontal: 80,
        spacingVertical: 20,
        autoFit: true,
        duration: 400,
        maxWidth: 300,
        initialExpandLevel: -1,  // Expand all levels by default
    };

    // Find and render all markmap elements
    function renderMarkmaps() {
        document.querySelectorAll('pre code.language-markmap').forEach((el) => {
            const container = el.parentElement;
            if (!container.querySelector('svg')) {
                const svg = document.createElement('svg');
                svg.style.width = '100%';
                svg.style.height = '600px';
                container.insertAdjacentElement('afterend', svg);
                
                try {
                    const mm = Markmap.create(svg, options);
                    const data = transformMarkdownToMarkmap(el.textContent);
                    mm.setData(data);
                    mm.fit();
                } catch (error) {
                    console.error('Error rendering markmap:', error);
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'markmap-error';
                    errorDiv.textContent = 'Error rendering mindmap. Please check the markdown format.';
                    container.insertAdjacentElement('afterend', errorDiv);
                }
            }
        });
    }

    // Transform markdown content to markmap data structure
    function transformMarkdownToMarkmap(content) {
        const lines = content.trim().split('\n');
        const root = { content: '', children: [] };
        const stack = [root];
        let currentLevel = 0;

        lines.forEach(line => {
            if (line.startsWith('#')) {
                const level = line.match(/^#+/)[0].length;
                const content = line.slice(level).trim();
                
                while (currentLevel >= level) {
                    stack.pop();
                    currentLevel--;
                }
                
                const node = { content, children: [] };
                stack[stack.length - 1].children.push(node);
                stack.push(node);
                currentLevel = level;
            } else if (line.trim().startsWith('*')) {
                const content = line.replace(/^\s*\*\s*/, '').trim();
                stack[stack.length - 1].children.push({ content, children: [] });
            }
        });

        return root.children[0] || { content: 'Empty Mindmap', children: [] };
    }

    // Initial render
    renderMarkmaps();

    // Re-render on navigation (for SPAs)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                renderMarkmaps();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}); 