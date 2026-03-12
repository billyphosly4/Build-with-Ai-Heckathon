// Dashboard JavaScript

// DOM Elements
let sidebar = document.querySelector('.sidebar');
let menuToggle = document.querySelector('.menu-toggle');
let themeToggle = document.querySelector('.theme-toggle');
let uploadArea = document.getElementById('uploadArea');
let previewContainer = document.getElementById('previewContainer');
let imagePreview = document.getElementById('imagePreview');
let analysisResult = document.getElementById('analysisResult');
let analysisModal = document.getElementById('analysisModal');

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    startSensorSimulation();
    loadAlerts();
});

// Initialize Dashboard Components
function initializeDashboard() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    let icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
let savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) {
        let icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Image Preview
function previewImage(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            uploadArea.style.display = 'none';
            previewContainer.style.display = 'block';
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Reset Upload
function resetUpload() {
    document.getElementById('imageInput').value = '';
    previewContainer.style.display = 'none';
    uploadArea.style.display = 'block';
    analysisResult.style.display = 'none';
}

// Open Upload Modal
function openUploadModal() {
    document.getElementById('imageInput').click();
}

// Analyze Image
function analyzeImage() {
    // Show modal
    analysisModal.classList.add('active');
    
    // Simulate analysis progress
    let progress = 0;
    let progressFill = document.querySelector('.progress-fill');
    let interval = setInterval(() => {
        progress += 10;
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                analysisModal.classList.remove('active');
                showAnalysisResult();
            }, 500);
        }
    }, 300);
}

// Show Analysis Result
function showAnalysisResult() {
    analysisResult.style.display = 'block';
    
    // Mock data - In production, this would come from your AI model
    let mockResults = {
        disease: 'Early Blight',
        confidence: '87%',
        severity: 'high',
        symptoms: 'Dark brown spots on leaves with yellow halos. Lesions are concentric rings.',
        treatment: 'Apply copper-based fungicide every 7-10 days. Remove and destroy infected leaves. Ensure proper air circulation.',
        prevention: 'Practice crop rotation. Avoid overhead watering. Use disease-resistant varieties.'
    };
    
    document.getElementById('diseaseName').textContent = mockResults.disease;
    document.getElementById('confidence').textContent = mockResults.confidence + ' Confidence';
    document.getElementById('symptoms').textContent = mockResults.symptoms;
    document.getElementById('treatment').textContent = mockResults.treatment;
    document.getElementById('prevention').textContent = mockResults.prevention;
    
    // Set severity class
    let severityElement = document.querySelector('.severity');
    severityElement.className = 'severity ' + mockResults.severity;
    severityElement.textContent = mockResults.severity.charAt(0).toUpperCase() + mockResults.severity.slice(1) + ' Severity';
}

// Close Modal
function closeModal() {
    analysisModal.classList.remove('active');
}

// Sensor Data Simulation
function startSensorSimulation() {
    // Update sensor data every 5 seconds
    setInterval(() => {
        // Generate random sensor values within realistic ranges
        let moisture = Math.floor(Math.random() * (80 - 60 + 1)) + 60; // 60-80%
        let temperature = (Math.random() * (28 - 20) + 20).toFixed(1); // 20-28°C
        let humidity = Math.floor(Math.random() * (80 - 60 + 1)) + 60; // 60-80%
        let light = Math.floor(Math.random() * (1000 - 700 + 1)) + 700; // 700-1000 µmol
        
        // Update DOM
        updateSensorValue('moistureValue', moisture + '%');
        updateSensorValue('temperatureValue', temperature + '°C');
        updateSensorValue('humidityValue', humidity + '%');
        updateSensorValue('lightValue', light + ' µmol');
        
        // Update progress bars
        updateProgressBar('moistureValue', moisture);
        updateProgressBar('temperatureValue', ((temperature - 20) / 8) * 100); // Convert to percentage
        updateProgressBar('humidityValue', humidity);
        updateProgressBar('lightValue', (light / 1000) * 100);
        
        // Check for alerts
        checkSensorAlerts(moisture, temperature, humidity);
        
    }, 5000);
}

// Update Sensor Value
function updateSensorValue(elementId, value) {
    let element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Update Progress Bar
function updateProgressBar(sensorId, value) {
    let sensorCard = document.getElementById(sensorId)?.closest('.sensor-card');
    if (sensorCard) {
        let progressBar = sensorCard.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = value + '%';
        }
    }
}

// Check Sensor Alerts
function checkSensorAlerts(moisture, temperature, humidity) {
    let alerts = [];
    
    if (moisture < 50) {
        alerts.push({
            type: 'low',
            message: 'Low soil moisture detected in North Field',
            severity: 'medium'
        });
    }
    
    if (temperature > 30) {
        alerts.push({
            type: 'high',
            message: 'High temperature stress risk',
            severity: 'high'
        });
    }
    
    if (humidity > 85) {
        alerts.push({
            type: 'warning',
            message: 'High humidity increases fungal disease risk',
            severity: 'high'
        });
    }
    
    if (alerts.length > 0) {
        displayAlerts(alerts);
    }
}

// Load Alerts
function loadAlerts() {
    // Mock alerts data
    let mockAlerts = [
        {
            title: 'High Humidity Alert',
            message: 'North Field - Humidity at 85% increases fungal disease risk',
            time: '10 minutes ago',
            severity: 'high',
            icon: 'exclamation-triangle'
        },
        {
            title: 'Early Blight Detected',
            message: 'South Field - 3 plants showing symptoms',
            time: '2 hours ago',
            severity: 'medium',
            icon: 'exclamation-circle'
        },
        {
            title: 'Low Soil Moisture',
            message: 'East Field - Moisture level at 45%, irrigation recommended',
            time: '5 hours ago',
            severity: 'low',
            icon: 'info-circle'
        }
    ];
    
    displayAlerts(mockAlerts);
}

// Display Alerts
function displayAlerts(alerts) {
    let alertsList = document.getElementById('alertsList');
    if (!alertsList) return;
    
    alertsList.innerHTML = '';
    
    alerts.forEach(alert => {
        let alertElement = document.createElement('div');
        alertElement.className = `alert-item ${alert.severity}`;
        
        alertElement.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${alert.icon || 'exclamation-circle'}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title || alert.type}</h4>
                <p>${alert.message}</p>
                <span class="alert-time"><i class="fas fa-clock"></i> ${alert.time || 'Just now'}</span>
            </div>
            <button class="alert-action" onclick="viewAlertDetails('${alert.title}')">View Details</button>
        `;
        
        alertsList.appendChild(alertElement);
    });
}

// View Alert Details
function viewAlertDetails(alertTitle) {
    alert(`Viewing details for: ${alertTitle}`);
    // In production, this would open a modal with detailed information
}

// Farm Selector Change
document.getElementById('farmSelector')?.addEventListener('change', function(e) {
    let farm = e.target.value;
    loadFarmData(farm);
});

// Load Farm Data
function loadFarmData(farm) {
    // In production, this would fetch data for the selected farm
    console.log('Loading data for farm:', farm);
    
    // Simulate data update
    showNotification(`Switched to ${farm.charAt(0).toUpperCase() + farm.slice(1)} Field`, 'info');
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    let notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export Data
function exportData() {
    let data = {
        sensors: {
            moisture: document.getElementById('moistureValue')?.textContent,
            temperature: document.getElementById('temperatureValue')?.textContent,
            humidity: document.getElementById('humidityValue')?.textContent,
            light: document.getElementById('lightValue')?.textContent
        },
        timestamp: new Date().toISOString()
    };
    
    // Create download link
    let blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = `sensor-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showNotification('Data exported successfully', 'success');
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape' && analysisModal.classList.contains('active')) {
        closeModal();
    }
    
    // Ctrl + U for upload
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        openUploadModal();
    }
    
    // Ctrl + E for export
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportData();
    }
});