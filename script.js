// Função para inicializar o site
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site Pretholas carregado!');
    
    // Inicializar funcionalidades
    initSmoothScroll();
    initProductButtons();
    initLocationModal();
    initSocialLinks();
    initMap();
});

// Scroll suave para âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funcionalidade dos botões de produto
function initProductButtons() {
    const productButtons = document.querySelectorAll('.btn-produto');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-produto');
            const productPrice = this.parentElement.querySelector('.produto-preco').textContent;
            
            alert(`Produto adicionado ao carrinho:\n${productName}\n${productPrice}`);
        });
    });
}

// Modal de alteração de localização
function initLocationModal() {
    const modal = document.getElementById('modal-localizacao');
    const btn = document.getElementById('btn-alterar-localizacao');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('form-localizacao');
    
    if (!modal || !btn) {
        console.log('Elementos do modal não encontrados');
        return;
    }
    
    // Abrir modal
    btn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Processar formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const endereco = document.getElementById('endereco').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const telefone = document.getElementById('telefone').value;
        
        // Atualizar informações na página
        updateLocationInfo(endereco, cidade, cep, telefone);
        
        // Fechar modal
        modal.style.display = 'none';
        
        // Mostrar confirmação
        alert('Localização atualizada com sucesso!');
    });
}

// Atualizar informações de localização
function updateLocationInfo(endereco, cidade, cep, telefone) {
    const locationInfo = document.querySelector('.localizacao-info');
    const paragraphs = locationInfo.querySelectorAll('p');
    
    // Atualizar elementos (pular o primeiro que é o título)
    paragraphs[1].textContent = endereco;
    paragraphs[2].textContent = cidade;
    paragraphs[3].textContent = `Telefone: ${telefone}`;
    
    // Atualizar também no footer
    const footerContact = document.querySelector('.footer-col:last-child');
    const footerParagraphs = footerContact.querySelectorAll('p');
    
    footerParagraphs[1].textContent = endereco;
    footerParagraphs[2].textContent = cidade;
    footerParagraphs[3].textContent = `Telefone: ${telefone}`;
}

// Inicializar links sociais
function initSocialLinks() {
    const facebookLink = document.getElementById('facebook-link');
    const whatsappLink = document.getElementById('whatsapp-link');
    
    // Link do Facebook
    facebookLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://facebook.com/pretholas', '_blank');
    });
    
    // Link do WhatsApp
    whatsappLink.addEventListener('click', function(e) {
        e.preventDefault();
        const phoneNumber = '551134567890';
        const message = 'Olá, gostaria de mais informações sobre os produtos Pretholas.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Inicializar mapa
function initMap() {
    const mapContainer = document.getElementById('mapa');
    
    if (!mapContainer) {
        console.log('Container do mapa não encontrado');
        return;
    }
    
    mapContainer.innerHTML = `
        <div style="width:100%; height:100%; background:linear-gradient(135deg, var(--verde-relva), var(--verde-claro)); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">
            <div style="text-align:center;">
                <div style="font-size:2rem; margin-bottom:10px;">📍</div>
                <div>Localização Pretholas</div>
                <div style="font-size:0.9rem; margin-top:10px; opacity:0.8;">Av. dos Esportes, 1234 - Centro</div>
            </div>
        </div>
    `;
}