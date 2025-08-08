const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

const healthResponses = {
    greetings: [
        "Hello! I'm here to help with your health questions. What would you like to know?",
        "Hi there! How can I assist you with your health and wellness today?",
        "Welcome! I'm ready to provide health recommendations. What's on your mind?"
    ],
    exercise: [ /* same as before */ ],
    nutrition: [ /* same as before */ ],
    mental: [ /* same as before */ ],
    sleep: [ /* same as before */ ],
    stress: [ /* same as before */ ]
};

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = content.replace(/\n/g, '<br>');
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    typingIndicator.style.display = 'flex';
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

function getHealthResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi') || message.includes('hey') ||
        message.includes('good morning') || message.includes('good afternoon')) {
        return healthResponses.greetings[Math.floor(Math.random() * healthResponses.greetings.length)];
    }

    if (message.includes('exercise') || message.includes('workout') || message.includes('fitness') ||
        message.includes('gym') || message.includes('cardio') || message.includes('strength')) {
        return healthResponses.exercise[Math.floor(Math.random() * healthResponses.exercise.length)];
    }

    if (message.includes('food') || message.includes('eat') || message.includes('diet') ||
        message.includes('nutrition') || message.includes('meal') || message.includes('healthy eating')) {
        return healthResponses.nutrition[Math.floor(Math.random() * healthResponses.nutrition.length)];
    }

    if (message.includes('mental') || message.includes('anxiety') || message.includes('depression') ||
        message.includes('stress') || message.includes('mood') || message.includes('feel')) {
        return healthResponses.mental[Math.floor(Math.random() * healthResponses.mental.length)];
    }

    if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired') ||
        message.includes('rest') || message.includes('bedtime')) {
        return healthResponses.sleep[Math.floor(Math.random() * healthResponses.sleep.length)];
    }

    if (message.includes('stress') || message.includes('overwhelmed') || message.includes('pressure') ||
        message.includes('tension') || message.includes('relax')) {
        return healthResponses.stress[Math.floor(Math.random() * healthResponses.stress.length)];
    }

    const defaultResponses = [
        "That's an interesting health question! ...",
        "Thank you for your question! ...",
        "I appreciate your question! ..."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, true);
    messageInput.value = '';
    sendButton.disabled = true;

    showTyping();

    setTimeout(() => {
        hideTyping();
        const botResponse = getHealthResponse(userMessage);
        addMessage(botResponse);
        sendButton.disabled = false;
        messageInput.focus();
    }, Math.random() * 1000 + 1000);
}

function sendQuickMessage(message) {
    messageInput.value = message;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

window.addEventListener('load', () => {
    messageInput.focus();
});
