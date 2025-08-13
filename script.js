const lengthSlider = document.getElementById('lengthSlider');
        const lengthDisplay = document.getElementById('lengthDisplay');
        const passwordField = document.getElementById('passwordField');
        const strengthIndicator = document.getElementById('strengthIndicator');
        const strengthText = document.getElementById('strengthText');
        const notification = document.getElementById('notification');
        const toggleArrow = document.getElementById('toggleArrow');
        const advancedContent = document.getElementById('advancedContent');

        // Character sets
        const charSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        const similarChars = '0Ol1I';

        // Update length display
        lengthSlider.addEventListener('input', function() {
            lengthDisplay.textContent = this.value;
        });

        // Generate password function
        function generatePassword() {
            const length = parseInt(lengthSlider.value);
            const includeUppercase = document.getElementById('uppercase').checked;
            const includeLowercase = document.getElementById('lowercase').checked;
            const includeNumbers = document.getElementById('numbers').checked;
            const includeSymbols = document.getElementById('symbols').checked;
            const excludeSimilar = document.getElementById('excludeSimilar').checked;

            let charset = '';
            let password = '';
            let guaranteedChars = [];

            // Build character set
            if (includeUppercase) {
                let chars = charSets.uppercase;
                if (excludeSimilar) chars = chars.replace(/[OI]/g, '');
                charset += chars;
                guaranteedChars.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            if (includeLowercase) {
                let chars = charSets.lowercase;
                if (excludeSimilar) chars = chars.replace(/[ol]/g, '');
                charset += chars;
                guaranteedChars.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            if (includeNumbers) {
                let chars = charSets.numbers;
                if (excludeSimilar) chars = chars.replace(/[01]/g, '');
                charset += chars;
                guaranteedChars.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            if (includeSymbols) {
                charset += charSets.symbols;
                guaranteedChars.push(charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)]);
            }

            if (charset === '') {
                alert('Please select at least one character type!');
                return;
            }

            // Generate password ensuring at least one character from each selected type
            for (let i = 0; i < length; i++) {
                if (i < guaranteedChars.length) {
                    password += guaranteedChars[i];
                } else {
                    password += charset.charAt(Math.floor(Math.random() * charset.length));
                }
            }

            // Shuffle the password to randomize guaranteed character positions
            password = shuffleString(password);

            passwordField.value = password;
            updatePasswordStrength(password);
            
            // Add generation animation
            passwordField.style.transform = 'scale(0.95)';
            setTimeout(() => {
                passwordField.style.transform = 'scale(1)';
            }, 150);
        }

        // Shuffle string function
        function shuffleString(str) {
            const arr = str.split('');
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr.join('');
        }

        // Password strength calculation
        function updatePasswordStrength(password) {
            let score = 0;
            const length = password.length;

            // Length score
            if (length >= 8) score += 1;
            if (length >= 12) score += 1;
            if (length >= 16) score += 1;

            // Character variety score
            if (/[a-z]/.test(password)) score += 1;
            if (/[A-Z]/.test(password)) score += 1;
            if (/[0-9]/.test(password)) score += 1;
            if (/[^A-Za-z0-9]/.test(password)) score += 1;

            // Pattern penalties
            if (/(.)\1{2,}/.test(password)) score -= 1;
            if (/123|abc|qwe/i.test(password)) score -= 1;

            let strength, className;
            if (score <= 3) {
                strength = 'Weak';
                className = 'strength-weak';
            } else if (score <= 5) {
                strength = 'Medium';
                className = 'strength-medium';
            } else {
                strength = 'Strong';
                className = 'strength-strong';
            }

            strengthIndicator.className = `strength-indicator ${className}`;
            strengthText.textContent = `Password Strength: ${strength} (${score}/7)`;
            strengthIndicator.style.display = 'block';
        }

        // Copy to clipboard function
        async function copyPassword() {
            if (!passwordField.value) {
                alert('Generate a password first!');
                return;
            }

            try {
                await navigator.clipboard.writeText(passwordField.value);
                showNotification();
            } catch (err) {
                // Fallback for older browsers
                passwordField.select();
                document.execCommand('copy');
                showNotification();
            }
        }

        // Show notification
        function showNotification() {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Toggle advanced options
        function toggleAdvanced() {
            const isOpen = advancedContent.classList.contains('open');
            if (isOpen) {
                advancedContent.classList.remove('open');
                toggleArrow.classList.remove('open');
            } else {
                advancedContent.classList.add('open');
                toggleArrow.classList.add('open');
            }
        }

        // Generate initial password
        document.addEventListener('DOMContentLoaded', function() {
            generatePassword();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                generatePassword();
            }
            if (e.ctrlKey && e.key === 'c' && passwordField.value) {
                copyPassword();
            }
        });