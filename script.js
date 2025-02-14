// Variables globales para información del jugador
let userGender = '';
let userName = '';

// Constantes para los diálogos y escenas
const STORY_SCENES = {
    INTRO: {
        text: [
            'Los copos de nieve caen suavemente mientras caminas por las calles de Tokio en Nochebuena. Las luces navideñas hacen que todo parezca sacado de una película romántica.',
            'Y hablando de películas románticas... ¿es ese Goro Akechi comprando un café en tu cafetería favorita?'
        ]
    },
    AKECHI_SCENES: {
        INITIAL: {
            dialog: '¡Oh! ¡{userName}! ¡Qué coincidencia! ¿También vienes por el café especial de Navidad?',
            image: 'akechi-sorprendido.webp',
            choices: [
                'En realidad, vengo por los pancakes que tanto te gustan.',
                'Solo escapaba del frío.',
                '¿Desde cuándo te gusta esta cafetería, detective?'
            ]
        },
        RESPONSES: {
            ATMOSPHERE: {
                dialog: '¿Recordaste lo de los pancakes? Vaya... me halagas. ¿Te gustaría compartir unos conmigo?',
                image: 'akechi-feliz.webp',
                next: 'QUESTION'
            },
            WALKING: {
                dialog: '¿Frío? Qué casualidad, justo tengo un café extra. ¿Será el destino o solo mis excelentes habilidades deductivas?',
                image: 'akechi-con-sonrisa-maliciosa.webp',
                next: 'QUESTION'
            },
            QUESTION: {
                dialog: '¿Un detective no puede tener sus lugares secretos? Aunque... tal vez, si te estaba esperando.',
                image: 'akechi-fingiendo-felicidad-pero-esta-enojado.png',
                next: 'QUESTION'
            }
        },
        QUESTION: {
            dialog: '*Jugando con su taza* Sabes, {userName}, he estado pensando... ¿crees en las coincidencias? Porque empiezo a dudar que lo sean.',
            image: 'akechi-con-sonrisa-maliciosa.webp',
            choices: [
                '¿Me has estado siguiendo, principe detective?',
                'Las coincidencias son el universo jugando a ser Cupido.',
                'Con lo listo que eres, seguro ya lo has deducido.'
            ],
            responses: {
                DESTINY: {
                    dialog: '¿Siguiéndote? *ríe* Por favor, soy un detective, no un acosador... solo memoricé tu rutina. ¡Es diferente!',
                    image: 'akechi-feliz.webp',
                    next: 'REVEAL'
                },
                CONTROL: {
                    dialog: '*Se atraganta con el café* ¿C-cupido? *tose nerviosamente* Vaya, eres más directa/o que yo con las deducciones.',
                    image: 'akechi-sonrojado-ligeramente.png',
                    next: 'REVEAL'
                },
                UNSURE: {
                    dialog: '¿Deducirlo? Mmm... ¿qué tal si me das más pistas?',
                    image: 'akechi-con-sonrisa-maliciosa.webp',
                    next: 'REVEAL'
                }
            }
        },
        REVEAL: {
            dialog: '*Mirando su taza vacía* {userName}... hay algo que he querido decirte. Y no, no es sobre un caso.',
            image: 'akechi-triste.webp',
            choices: [
                '¿Es sobre por qué siempre apareces donde estoy?',
                'Déjame adivinar... ¿necesitas ayuda con otro "misterio"?',
                '¿Tiene que ver con los pancakes?'
            ],
            responses: {
                EXPLAIN: {
                    dialog: '*Riendo* Los pancakes fueron solo una excusa. Aunque debo admitir que son mi debilidad... después de ti.',
                    image: 'akechi-feliz.webp',
                    next: 'FINAL'
                },
                LISTENING: {
                    dialog: '¿Misterio? El único misterio aquí es cómo no me he atrevido a decirte esto antes...',
                    image: 'akechi-fingiendo-felicidad-pero-esta-enojado.png',
                    next: 'FINAL'
                },
                TRUST: {
                    dialog: 'Aparezco donde estás porque... bueno, ¿no es obvio? Para un detective, estoy siendo bastante malo ocultando esto.',
                    image: 'akechi-con-sonrisa-maliciosa.webp',
                    next: 'FINAL'
                }
            }
        },
        FINAL: {
            dialog: '*Respirando profundo* {userName}, ¿te gustaría... no sé... tal vez... ¿resolver el misterio del mejor restaurante de pancakes conmigo?',
            image: 'akechi-fingiendo-felicidad-pero-esta-enojado.png',
            choices: [
                '¿Esto es una cita, detective?',
                'Solo si prometes no hablar de trabajo.',
                '¿Estás sonrojado, Akechi?'
            ],
            responses: {
                MORE: {
                    dialog: '¿Tan obvio soy? Y yo que pensaba que era bueno ocultando evidencia...',
                    image: 'akechi-sonrojado-ligeramente.png',
                    next: 'ENDING'
                },
                UNSURE: {
                    dialog: '¿Trabajo? No, no... esto es puramente una investigación personal. Muy personal.',
                    image: 'akechi-feliz.webp',
                    next: 'ENDING'
                },
                SECRET: {
                    dialog: '¿Q-qué? ¡No! Es solo el café caliente... y tal vez tu presencia.',
                    image: 'akechi-sonrojado-ligeramente.png',
                    next: 'ENDING'
                }
            }
        },
        ENDING: {
            dialog: 'Entonces... ¿qué dices? ¿Me ayudarías a resolver este "caso" particular?',
            image: 'akechi-con-sonrisa-maliciosa.webp',
            choices: [
                'Me encantan los misterios... y los detectives.',
                'Prefiero mantener nuestra relación profesional.',
                'Depende... ¿pagas tú los pancakes?'
            ],
            responses: {
                TOGETHER: {
                    dialog: '*Con ojos brillantes* ¡Perfecto! Aunque debo advertirte... soy mejor detective que cocinero.',
                    image: 'akechi-feliz.webp',
                    next: 'SECRET_ENDING_UNLOCK'
                },
                NOT_INVOLVED: {
                    dialog: '*Intenta mantener la sonrisa* Oh... claro, lo entiendo. Los pancakes pueden ser... muy complicados.',
                    image: 'akechi-triste.webp',
                    end: true,
                    endingType: 'Final Neutral'
                },
                NO_INTEREST: {
                    dialog: '¡¿Qué?! ¿Después de todo mi planeamiento meticuloso me pides que pague yo?',
                    image: 'akechi-medio-enojado.webp',
                    next: 'ANGER'
                }
            }
        },
        ANGER: {
            dialog: '¡Esta no era la reacción que esperaba!',
            image: 'akechi-muy-enojado.webp',
            choices: [
                '¡Era broma! Tu cara no tiene precio.',
                'Un detective debería poder pagar la primera cita, ¿no?'
            ],
            responses: {
                RELAX: {
                    dialog: '*Relajándose* Casi arruinas mi momento dramático... pero me gusta tu sentido del humor.',
                    image: 'akechi-fingiendo-felicidad-pero-esta-enojado.png',
                    next: 'SECRET_ENDING_UNLOCK'
                },
                NO_TIME: {
                    dialog: '*Suspira dramáticamente* Mi orgullo de detective... ¡herido por unos pancakes!',
                    image: 'akechi-fingiendo-felicidad-pero-esta-enojado.png',
                    end: true,
                    endingType: 'Final Cómico'
                }
            }
        },
        SECRET_ENDING_UNLOCK: {
            dialog: '*Nervioso pero decidido* {userName}... me gustas. Y no solo por tu buen gusto en cafeterías.',
            image: 'akechi-sonrojado-ligeramente.png',
            choices: [
                'Tú también me gustas, detective pancake.',
                'Prefiero que sigamos siendo amigos... pero los pancakes son negociables.'
            ],
            responses: {
                LOVE: {
                    dialog: '*Sonrisa radiante* ¿Detective pancake? Bueno, acepto el apodo si vienes conmigo por más.',
                    image: 'akechi-sonrojado-feliz (final oculto).png',
                    end: true,
                    endingType: 'Final Dulce'
                },
                FRIEND: {
                    dialog: '*Sonrisa suave* Los pancakes siempre serán mejor en buena compañía, incluso si es solo como amigos.',
                    image: 'akechi-triste.webp',
                    end: true,
                    endingType: 'Final Agridulce'
                }
            }
        }
    }
};

// Funciones de utilidad
function createHearts() {
    const heartBackground = document.querySelector('.heart-background');
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        
        const size = 10 + Math.random() * 30;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        heart.style.animationDelay = `${Math.random() * 3}s`;
        
        heartBackground.appendChild(heart);
    }
}

function typeWriter(element, text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Funciones de manejo de escenas
function showPage(pageId) {
    const pages = [
        'main-page', 
        'gender-page', 
        'name-page', 
        'confirm-page', 
        'story-page', 
        'akechi-interaction-page'
    ];
    
    pages.forEach(page => {
        document.getElementById(page).classList.add('hidden');
    });
    
    document.getElementById(pageId).classList.remove('hidden');
}

function createButton(text, className = 'choice-button') {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    return button;
}

function updateAkechiScene(dialog, imageSource, choices = null) {
    const akechiDialog = document.getElementById('akechi-dialog');
    const akechiImage = document.getElementById('akechi-image');
    const playerChoices = document.getElementById('player-choices');
    
    akechiDialog.textContent = dialog.replace('{userName}', userName);
    akechiImage.src = imageSource;
    
    playerChoices.innerHTML = ''; // Limpiar elecciones anteriores
    if (choices) {
        choices.forEach((choice, index) => {
            const button = createButton(choice);
            button.onclick = () => {
                handleChoice(index, choices[index]);
            };
            playerChoices.appendChild(button);
        });
    } else {
        // Crear botón Continuar si no hay opciones
        const continueButton = createButton('Continuar', 'continue-button');
        continueButton.onclick = () => {
            continueStory();
        };
        playerChoices.appendChild(continueButton);
    }
}

async function handleChoice(choiceIndex, choiceText) {
    const playerChoices = document.getElementById('player-choices');

    // Deshabilitar botones durante la transición
    playerChoices.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });

    // Obtener la escena actual basada en el texto del diálogo actual
    const currentDialog = document.getElementById('akechi-dialog').textContent;
    const scenes = STORY_SCENES.AKECHI_SCENES;
    let nextScene = null;
    let response = null;

    // Determinar la respuesta basada en la escena actual y la elección
    if (currentDialog === scenes.INITIAL.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.RESPONSES.ATMOSPHERE; break;
            case 1: response = scenes.RESPONSES.WALKING; break;
            case 2: response = scenes.RESPONSES.QUESTION; break;
        }
    } else if (currentDialog === scenes.QUESTION.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.QUESTION.responses.DESTINY; break;
            case 1: response = scenes.QUESTION.responses.CONTROL; break;
            case 2: response = scenes.QUESTION.responses.UNSURE; break;
        }
    } else if (currentDialog === scenes.REVEAL.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.REVEAL.responses.EXPLAIN; break;
            case 1: response = scenes.REVEAL.responses.LISTENING; break;
            case 2: response = scenes.REVEAL.responses.TRUST; break;
        }
    } else if (currentDialog === scenes.FINAL.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.FINAL.responses.MORE; break;
            case 1: response = scenes.FINAL.responses.UNSURE; break;
            case 2: response = scenes.FINAL.responses.SECRET; break;
        }
    } else if (currentDialog === scenes.ENDING.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.ENDING.responses.TOGETHER; break;
            case 1: response = scenes.ENDING.responses.NOT_INVOLVED; break;
            case 2: response = scenes.ENDING.responses.NO_INTEREST; break;
        }
    } else if (currentDialog === scenes.ANGER.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.ANGER.responses.RELAX; break;
            case 1: response = scenes.ANGER.responses.NO_TIME; break;
        }
    } else if (currentDialog === scenes.SECRET_ENDING_UNLOCK.dialog.replace('{userName}', userName)) {
        switch (choiceIndex) {
            case 0: response = scenes.SECRET_ENDING_UNLOCK.responses.LOVE; break;
            case 1: response = scenes.SECRET_ENDING_UNLOCK.responses.FRIEND; break;
        }
    }

    if (!response) {
        console.error("No se encontró una respuesta válida");
        return;
    }

    // Actualizar la escena con la respuesta
    const akechiDialog = document.getElementById('akechi-dialog');
    const akechiImage = document.getElementById('akechi-image');
    
    akechiDialog.textContent = response.dialog.replace('{userName}', userName);
    akechiImage.src = response.image;

    // Limpiar las opciones anteriores
    playerChoices.innerHTML = '';

    // Si es un final, mostrar los botones correspondientes
    if (response.end) {
        const endingButton = createButton(response.endingType, 'ending-button');
        const restartButton = createButton('Reiniciar partida', 'restart-button');
        restartButton.onclick = restartGame;
        playerChoices.appendChild(endingButton);
        playerChoices.appendChild(restartButton);
    } 
    // Si hay una siguiente escena, mostrar el botón de continuar
    else if (response.next) {
        const continueButton = createButton('Continuar', 'continue-button');
        continueButton.onclick = () => {
            const nextSceneData = scenes[response.next];
            if (nextSceneData) {
                updateAkechiScene(
                    nextSceneData.dialog.replace('{userName}', userName),
                    nextSceneData.image,
                    nextSceneData.choices
                );
            }
        };
        playerChoices.appendChild(continueButton);
    }

    // Habilitar los nuevos botones
    playerChoices.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
}

function updateAkechiScene(dialog, imageSource, choices = null) {
    const akechiDialog = document.getElementById('akechi-dialog');
    const akechiImage = document.getElementById('akechi-image');
    const playerChoices = document.getElementById('player-choices');
    
    akechiDialog.textContent = dialog;
    akechiImage.src = imageSource;
    
    playerChoices.innerHTML = '';
    
    if (choices) {
        choices.forEach((choice, index) => {
            const button = createButton(choice);
            button.onclick = () => handleChoice(index, choice);
            playerChoices.appendChild(button);
        });
    }
}

function continueStory() {
    const akechiDialog = document.getElementById('akechi-dialog');
    const akechiImage = document.getElementById('akechi-image');
    const playerChoices = document.getElementById('player-choices');

    const currentDialog = akechiDialog.textContent;

    // Buscar la siguiente escena basada en el diálogo actual
    const scenes = STORY_SCENES.AKECHI_SCENES;
    let nextScene;

    // Verificar el diálogo actual y determinar la siguiente escena
    for (const key in scenes.RESPONSES) {
        if (scenes.RESPONSES[key].dialog === currentDialog) {
            nextScene = scenes[scenes.RESPONSES[key].next];
            break;
        }
    }

    if (!nextScene) {
        // Verificar si es una escena de pregunta
        for (const key in scenes.QUESTION.responses) {
            if (scenes.QUESTION.responses[key].dialog === currentDialog) {
                nextScene = scenes[scenes.QUESTION.responses[key].next];
                break;
            }
        }
    }

    if (!nextScene) {
        // Verificar si es una escena de revelación
        for (const key in scenes.REVEAL.responses) {
            if (scenes.REVEAL.responses[key].dialog === currentDialog) {
                nextScene = scenes[scenes.REVEAL.responses[key].next];
                break;
            }
        }
    }

    if (!nextScene) {
        // Verificar si es una escena final
        for (const key in scenes.FINAL.responses) {
            if (scenes.FINAL.responses[key].dialog === currentDialog) {
                nextScene = scenes[scenes.FINAL.responses[key].next];
                break;
            }
        }
    }

    if (!nextScene) {
        // Verificar si es una escena de final secreto
        for (const key in scenes.SECRET_ENDING.responses) {
            if (scenes.SECRET_ENDING.responses[key].dialog === currentDialog) {
                nextScene = scenes[scenes.SECRET_ENDING.responses[key].next];
                break;
            }
        }
    }

    if (!nextScene) {
        console.error("No se pudo encontrar la siguiente escena.");
        return;
    }

    if (nextScene.end) {
        // Si es el final de la historia, mostrar botón de final y reiniciar partida
        updateAkechiScene(nextScene.dialog, nextScene.image, null);
        const endingButton = createButton(nextScene.endingType, 'ending-button');
        const restartButton = createButton('Reiniciar partida', 'restart-button');
        restartButton.onclick = restartGame;
        playerChoices.appendChild(endingButton);
        playerChoices.appendChild(restartButton);
    } else {
        // Continuar con la siguiente escena
        updateAkechiScene(nextScene.dialog, nextScene.image, nextScene.choices);
    }
}

// Función de reinicio
function restartGame() {
    userGender = '';
    userName = '';

    // Resetear inputs
    document.querySelectorAll('input[name="gender"]').forEach(input => input.checked = false);
    document.getElementById('name-input').value = '';

    showPage('main-page');
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    createHearts();

    // Configurar eventos iniciales
    document.getElementById('start-button').onclick = () => showPage('gender-page');

    // Configurar selección de género
    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.onchange = () => {
            userGender = input.value;
            document.getElementById('gender-next-button').classList.remove('hidden');
        };
    });

    // Configurar navegación entre páginas
    document.getElementById('gender-next-button').onclick = () => showPage('name-page');

    // Configurar entrada de nombre
    const nameInput = document.getElementById('name-input');
    nameInput.oninput = () => {
        const nameNextButton = document.getElementById('name-next-button');
        if (nameInput.value.trim() !== '') {
            nameNextButton.classList.remove('hidden');
        } else {
            nameNextButton.classList.add('hidden');
        }
    };

    // Configurar confirmación
    document.getElementById('name-next-button').onclick = () => {
        userName = nameInput.value.trim();
        document.getElementById('confirm-text').textContent = `Género: ${userGender}\nNombre: ${userName}`;
        showPage('confirm-page');
    };

    // Iniciar historia
    document.getElementById('confirm-button').onclick = async () => {
        showPage('story-page');

        // Mostrar introducción
        const [paragraph1, paragraph2] = STORY_SCENES.INTRO.text;
        await typeWriter(document.getElementById('story-paragraph1'), paragraph1);

        document.getElementById('story-paragraph2').classList.remove('hidden');
        await typeWriter(document.getElementById('story-paragraph2'), paragraph2);

        document.getElementById('continue-story-button').classList.remove('hidden');
    };

    // Configurar botón de continuar historia
    document.getElementById('continue-story-button').onclick = () => {
        showPage('akechi-interaction-page');

        const initialScene = STORY_SCENES.AKECHI_SCENES.INITIAL;
        updateAkechiScene(
            initialScene.dialog.replace('{userName}', userName),
            initialScene.image,
            initialScene.choices
        );
    };

    // Configurar botón de reinicio
    document.getElementById('restart-button').onclick = restartGame;
});