// 笔记页面脚本

document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面的科目名称
    const pageTitle = document.querySelector('.nav-title');
    const subjectName = pageTitle ? pageTitle.textContent.trim() : '';
    
    // 加载章节和内容
    loadChapters(subjectName);
    loadNoteContent(subjectName);
    
    // 初始化图片点击事件
    initImageGallery();
});

// 初始化图片画廊
function initImageGallery() {
    const imageItems = document.querySelectorAll('.image-item img');
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="image-modal-close">&times;</span>
        <div class="image-modal-content">
            <img src="" alt="" />
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.image-modal-close');
    
    // 为每张图片添加点击事件
    imageItems.forEach(img => {
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 加载章节目录
function loadChapters(subjectName) {
    const chaptersList = document.getElementById('chaptersList');
    if (!chaptersList) return;
    
    // 从本地存储或配置中获取章节列表
    const chapters = getChaptersForSubject(subjectName);
    
    if (chapters.length === 0) {
        // 显示占位符
        return;
    }
    
    chaptersList.innerHTML = '';
    
    chapters.forEach((chapter, index) => {
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.innerHTML = `
            <h3>${chapter.title}</h3>
            <p>${chapter.description || ''}</p>
        `;
        
        chapterItem.addEventListener('click', function() {
            scrollToSection(chapter.id);
        });
        
        chaptersList.appendChild(chapterItem);
    });
}

// 加载笔记内容
function loadNoteContent(subjectName) {
    const noteSections = document.getElementById('noteSections');
    if (!noteSections) return;
    
    // 从本地存储或配置中获取笔记内容
    const sections = getNoteSectionsForSubject(subjectName);
    
    if (sections.length === 0) {
        noteSections.innerHTML = '<div class="note-section"><p>笔记内容正在整理中，敬请期待...</p></div>';
        return;
    }
    
    noteSections.innerHTML = '';
    
    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'note-section';
        sectionDiv.id = section.id;
        sectionDiv.innerHTML = formatNoteContent(section);
        noteSections.appendChild(sectionDiv);
    });
}

// 格式化笔记内容
function formatNoteContent(section) {
    let html = `<h2>${section.title}</h2>`;
    
    if (section.content) {
        // 简单的 Markdown 转 HTML（可以后续扩展）
        html += convertMarkdownToHTML(section.content);
    }
    
    return html;
}

// 简单的 Markdown 转换（基础功能）
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // 转换标题
    html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');
    
    // 转换列表
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
    
    // 包装列表
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // 转换代码块
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 转换段落
    html = html.split('\n\n').map(para => {
        if (!para.match(/^<[hul]/) && para.trim()) {
            return `<p>${para.trim()}</p>`;
        }
        return para;
    }).join('\n');
    
    return html;
}

// 获取科目的章节列表
function getChaptersForSubject(subjectName) {
    // 这里可以从本地存储、配置文件或API获取
    // 目前返回空数组，后续可以扩展
    return [];
}

// 获取科目的笔记内容
function getNoteSectionsForSubject(subjectName) {
    // 这里可以从本地存储、配置文件或API获取
    // 目前返回空数组，后续可以扩展
    return [];
}

// 滚动到指定章节
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

