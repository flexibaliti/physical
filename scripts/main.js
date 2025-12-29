// 滚动动画控制
document.addEventListener('DOMContentLoaded', function() {
    // 获取需要动画的元素
    const purposeSection = document.querySelector('.purpose-section');
    const notesSection = document.querySelector('.notes-section');
    const thanksSection = document.querySelector('.thanks-section');
    const purposeCards = document.querySelectorAll('.purpose-card');
    const noteCards = document.querySelectorAll('.note-card');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // 滚动指示器点击事件
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            purposeSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Intersection Observer 用于检测元素是否进入视口
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察各个section
    if (purposeSection) {
        observer.observe(purposeSection);
    }

    if (notesSection) {
        observer.observe(notesSection);
    }

    if (thanksSection) {
        observer.observe(thanksSection);
    }

    // 观察卡片，添加延迟动画
    purposeCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    noteCards.forEach((card, index) => {
        observer.observe(card);
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // 加载笔记目录
    loadNotesDirectory();
});

// 加载笔记目录
function loadNotesDirectory() {
    const notesGrid = document.getElementById('notesGrid');
    
    // 这里可以从文件系统或API加载笔记列表
    // 目前使用占位符，后续可以扩展
    const notes = getNotesList();
    
    if (notes.length === 0) {
        // 如果没有笔记，显示占位符
        return;
    }
    
    // 清空占位符
    notesGrid.innerHTML = '';
    
    // 创建笔记卡片
    notes.forEach(note => {
        const noteCard = createNoteCard(note);
        notesGrid.appendChild(noteCard);
        
        // 观察新创建的卡片
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(noteCard);
    });
}

// 获取笔记列表（科目列表）
function getNotesList() {
    return [
        { title: '半导体物理', filename: '半导体物理.html', category: '专业课程' },
        { title: '电动力学', filename: '电动力学.html', category: '专业课程' },
        { title: '电工', filename: '电工.html', category: '基础课程' },
        { title: '模电', filename: '模电.html', category: '基础课程' },
        { title: '数电', filename: '数电.html', category: '基础课程' },
        { title: '固体物理', filename: '固体物理.html', category: '专业课程' },
        { title: '光学', filename: '光学.html', category: '专业课程' },
        { title: '量子力学', filename: '量子力学.html', category: '专业课程' },
        { title: '计算物理', filename: '计算物理.html', category: '专业课程' },
        { title: '近代物理', filename: '近代物理.html', category: '专业课程' },
        { title: '热力学与统计物理', filename: '热力学与统计物理.html', category: '专业课程' },
        { title: '数学物理方法', filename: '数学物理方法.html', category: '专业课程' },
        { title: '液晶光学', filename: '液晶光学.html', category: '液晶方向' },
        { title: '液晶器件工艺与材料', filename: '液晶器件工艺与材料.html', category: '液晶方向' },
        { title: '液晶器件原理与测试技术', filename: '液晶器件原理与测试技术.html', category: '液晶方向' },
        { title: '液晶驱动技术', filename: '液晶驱动技术.html', category: '液晶方向' },
        { title: '液晶物理', filename: '液晶物理.html', category: '液晶方向' },
        { title: '电磁学', filename: '电磁学.html', category: '基础课程' },
        { title: '力学', filename: '力学.html', category: '基础课程' },
        { title: '高等数学', filename: '高等数学.html', category: '数学课程' },
        { title: '线性代数', filename: '线性代数.html', category: '数学课程' },
        { title: '概率论与统计', filename: '概率论与统计.html', category: '数学课程' },
        { title: '理论力学', filename: '理论力学.html', category: '专业课程' }
    ];
}

// 创建笔记卡片
function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
        <h3>${note.title}</h3>
        <p class="note-category">${note.category || '其他'}</p>
        <p class="note-description">${note.description || '点击查看详细内容'}</p>
    `;
    
    // 添加点击事件，跳转到笔记页面
    card.addEventListener('click', function() {
        window.location.href = `notes/${note.filename}`;
    });
    
    return card;
}

// 平滑滚动增强
let isScrolling = false;

window.addEventListener('scroll', function() {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            // 可以在这里添加额外的滚动效果
            isScrolling = false;
        });
        isScrolling = true;
    }
});

