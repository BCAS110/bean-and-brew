import { initNavigation } from './interactions/navigation.js';
import { initMenu } from './interactions/menu.js';
import { initGallery } from './interactions/gallery.js';
import { initAnimations } from './animations/index.js';
initNavigation();
initMenu();
initGallery();
initAnimations();
document.documentElement.dataset.appReady = 'true';
