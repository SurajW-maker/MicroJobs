document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const listViewBtn = document.getElementById('list-view-btn');
    const mapViewBtn = document.getElementById('map-view-btn');
    const listView = document.getElementById('list-view');
    const mapView = document.getElementById('map-view');
    const emptyState = document.getElementById('empty-state');
    const postJobBtn = document.getElementById('post-job-btn');
    const postJobModal = document.getElementById('post-job-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const jobDetailModal = document.getElementById('job-detail-modal');
    const acceptJobBtn = document.getElementById('accept-job-btn');
    const acceptanceModal = document.getElementById('acceptance-modal');
    const viewJobDetailsBtn = document.getElementById('view-job-details');
    const chatNowBtn = document.getElementById('chat-now');
    const centerPostBtn = document.getElementById('center-post-btn');
    
    // Job posting modal elements
    const jobTypeBtns = document.querySelectorAll('.job-type-btn');
    const nextStepBtn = document.getElementById('next-step');
    const prevStepBtn = document.getElementById('prev-step');
    const postJobFinalBtn = document.getElementById('post-job');
    const steps = document.querySelectorAll('.step');
    const jobDuration = document.getElementById('job-duration');
    const durationValue = document.getElementById('duration-value');
    const urgentToggle = document.getElementById('urgent-job');
    const jobPayment = document.getElementById('job-payment');
    const escrowAmount = document.getElementById('escrow-amount');
    
    // Sample job data
    const sampleJobs = [
        {
            id: 1,
            type: 'grocery',
            title: 'Grocery Pickup @More Megastore',
            description: 'Need someone to pick up my weekly groceries from More Megastore. I\'ll share the list via chat after acceptance.',
            duration: 30,
            payment: 250,
            distance: 0.4,
            urgent: false,
            poster: {
                name: 'Priya M.',
                avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
                rating: 4.8,
                jobsPosted: 12,
                verified: true
            }
        },
        {
            id: 2,
            type: 'pet',
            title: 'Dog Walk @Central Park',
            description: 'Need someone to walk my golden retriever for 30 mins in the evening. He\'s very friendly!',
            duration: 30,
            payment: 300,
            distance: 0.7,
            urgent: true,
            poster: {
                name: 'Rahul S.',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                rating: 4.9,
                jobsPosted: 5,
                verified: true
            }
        },
        {
            id: 3,
            type: 'repair',
            title: 'Fix Leaky Kitchen Faucet',
            description: 'Kitchen faucet is leaking. Need someone with basic plumbing skills to fix it.',
            duration: 45,
            payment: 500,
            distance: 0.9,
            urgent: false,
            poster: {
                name: 'Ananya K.',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                rating: 4.5,
                jobsPosted: 3,
                verified: false
            } 
        },
         {
        id: 4,
        type: 'tutoring',
        title: 'Math Tuition for Class 8 Student',
        description: 'Need a tutor to help with algebra & geometry for my son. 1 hour session.',
        duration: 60,
        payment: 500,
        distance: 2.0,
        urgent: false,
        poster: {
            name: 'Rahul P.',
            avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
            rating: 4.7,
            jobsPosted: 20,
            verified: true
        }
    },
    {
        id: 5,
        type: 'delivery',
        title: 'Deliver Cake to Railway Colony',
        description: 'Pick up a birthday cake from CakeZone and deliver to Railway Colony before 5 PM.',
        duration: 20,
        payment: 120,
        distance: 1.0,
        urgent: true,
        poster: {
            name: 'Neha K.',
            avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
            rating: 4.6,
            jobsPosted: 9,
            verified: false
        }
    },
    {
        id: 6,
        type: 'errand',
        title: 'Drop Parcel at Blue Dart Office',
        description: 'Need to drop an urgent parcel at the Blue Dart office before closing time.',
        duration: 25,
        payment: 180,
        distance: 0.8,
        urgent: true,
        poster: {
            name: 'Karan V.',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
            rating: 4.4,
            jobsPosted: 7,
            verified: true
        }
    },
    {
        id: 7,
        type: 'moving',
        title: 'Help Shift Furniture Within House',
        description: 'Need help moving a bed and cupboard from one room to another.',
        duration: 40,
        payment: 200,
        distance: 0.2,
        urgent: false,
        poster: {
            name: 'Mona L.',
            avatar: 'https://randomuser.me/api/portraits/women/77.jpg',
            rating: 4.9,
            jobsPosted: 14,
            verified: true
        }
    },
    {
        id: 8,
        type: 'cleaning',
        title: 'Clean Balcony & Windows',
        description: 'Balcony and windows need cleaning after dust storm. Cleaning supplies provided.',
        duration: 60,
        payment: 350,
        distance: 1.5,
        urgent: false,
        poster: {
            name: 'Deepak T.',
            avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
            rating: 4.3,
            jobsPosted: 5,
            verified: false
        }
    },
    {
        id: 9,
        type: 'tech-help',
        title: 'Set Up New Wi-Fi Router',
        description: 'Bought a new router, need help setting it up and connecting devices.',
        duration: 30,
        payment: 250,
        distance: 0.9,
        urgent: true,
        poster: {
            name: 'Sneha B.',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            rating: 4.8,
            jobsPosted: 11,
            verified: true
        }
    },
    {
        id: 10,
        type: 'shopping',
        title: 'Buy Vegetables from Local Market',
        description: 'Need someone to get fresh vegetables from Gandhi Market and deliver home.',
        duration: 35,
        payment: 150,
        distance: 0.5,
        urgent: false,
        poster: {
            name: 'Vikas J.',
            avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
            rating: 4.5,
            jobsPosted: 6,
            verified: false
        }
    }
];

    
    // Current state
    let currentStep = 1;
    let selectedJobType = null;
    
    // Initialize the app
    function initApp() {
        renderJobFeed();
        setupEventListeners();
        checkEmptyState();
    }
    
    // Render job feed
    function renderJobFeed() {
        const jobFeed = document.querySelector('.job-feed');
        jobFeed.innerHTML = '';
        
        if (sampleJobs.length === 0) {
            listView.classList.remove('active');
            emptyState.classList.add('active');
            return;
        }
        
        sampleJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = `job-card ${job.urgent ? 'urgent' : ''}`;
            jobCard.dataset.id = job.id;
            
            const typeIcon = getJobTypeIcon(job.type);
            
            jobCard.innerHTML = `
                <div class="job-card-header">
                    <div class="job-type-icon">
                        <i class="fas ${typeIcon}"></i>
                    </div>
                    <div class="job-title">
                        <h4>${job.title}</h4>
                        <div class="job-meta">
                            <span><i class="fas fa-clock"></i> ${job.duration} mins</span>
                            <span><i class="fas fa-rupee-sign"></i> ${job.payment}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${job.distance}km</span>
                        </div>
                    </div>
                </div>
                <div class="job-description">
                    <p>${job.description}</p>
                </div>
                <div class="job-poster">
                    <div class="poster-info">
                        <div class="poster-avatar">
                            <img src="${job.poster.avatar}" alt="Poster">
                        </div>
                        <div class="poster-details">
                            <h5>${job.poster.name}</h5>
                            <div class="poster-rating">
                                <i class="fas fa-star"></i>
                                <span>${job.poster.rating} (${job.poster.jobsPosted} jobs posted)</span>
                                ${job.poster.verified ? '<i class="fas fa-check-circle verified"></i>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="job-actions">
                    <button class="primary-btn accept-btn">
                        <i class="fas fa-check"></i> Accept Job
                    </button>
                </div>
            `;
            
            jobFeed.appendChild(jobCard);
            
            // Add event listener to the accept button
            const acceptBtn = jobCard.querySelector('.accept-btn');
            acceptBtn.addEventListener('click', () => {
                openJobDetailModal(job.id);
            });
        });
    }
    
    // Get icon for job type
    function getJobTypeIcon(type) {
        const icons = {
            grocery: 'fa-shopping-basket',
            pet: 'fa-paw',
            repair: 'fa-tools',
            delivery: 'fa-motorcycle',
            tutoring: 'fa-book',
            cleaning: 'fa-broom',
            other: 'fa-ellipsis-h'
        };
        return icons[type] || 'fa-question-circle';
    }
    
    // Open job detail modal
    function openJobDetailModal(jobId) {
        const job = sampleJobs.find(j => j.id === jobId);
        if (!job) return;
        
        const typeIcon = getJobTypeIcon(job.type);
        
        document.querySelector('#job-detail-modal .job-type-icon i').className = `fas ${typeIcon}`;
        document.querySelector('#job-detail-modal .job-title h4').textContent = job.title;
        document.querySelector('#job-detail-modal .job-meta').innerHTML = `
            <span><i class="fas fa-clock"></i> ${job.duration} mins</span>
            <span><i class="fas fa-rupee-sign"></i> ${job.payment}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${job.distance}km</span>
        `;
        document.querySelector('#job-detail-modal .job-description p').textContent = job.description;
        document.querySelector('#job-detail-modal .poster-avatar img').src = job.poster.avatar;
        document.querySelector('#job-detail-modal .poster-details h5').textContent = job.poster.name;
        document.querySelector('#job-detail-modal .poster-rating').innerHTML = `
            <i class="fas fa-star"></i>
            <span>${job.poster.rating} (${job.poster.jobsPosted} jobs posted)</span>
            ${job.poster.verified ? '<i class="fas fa-check-circle verified"></i>' : ''}
        `;
        
        jobDetailModal.classList.add('active');
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // View toggle
        listViewBtn.addEventListener('click', () => {
            listViewBtn.classList.add('active');
            mapViewBtn.classList.remove('active');
            listView.classList.add('active');
            mapView.classList.remove('active');
        });
        
        mapViewBtn.addEventListener('click', () => {
            mapViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            mapView.classList.add('active');
            listView.classList.remove('active');
        });
        
        // Post job button
        postJobBtn.addEventListener('click', openPostJobModal);
        centerPostBtn.addEventListener('click', openPostJobModal);
        
        // Close modals
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
        
        // Job posting modal
        jobTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                jobTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedJobType = btn.dataset.type;
            });
        });
        
        // Job duration slider
        jobDuration.addEventListener('input', () => {
            durationValue.textContent = jobDuration.value;
        });
        
        // Urgent toggle and payment calculation
        urgentToggle.addEventListener('change', updateEscrowAmount);
        jobPayment.addEventListener('input', updateEscrowAmount);
        
        // Step navigation
        nextStepBtn.addEventListener('click', goToNextStep);
        prevStepBtn.addEventListener('click', goToPrevStep);
        postJobFinalBtn.addEventListener('click', postNewJob);
        
        // Job acceptance
        acceptJobBtn.addEventListener('click', () => {
            jobDetailModal.classList.remove('active');
            acceptanceModal.classList.add('active');
        });
        
        // Acceptance modal buttons
        viewJobDetailsBtn.addEventListener('click', () => {
            acceptanceModal.classList.remove('active');
            jobDetailModal.classList.add('active');
        });
        
        chatNowBtn.addEventListener('click', () => {
            closeAllModals();
            alert('Chat feature would open here in a real implementation');
        });
    }
    
    // Open post job modal
    function openPostJobModal() {
        postJobModal.classList.add('active');
        showStep(1);
    }
    
    // Close all modals
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    // Show specific step in job posting
    function showStep(stepNumber) {
        currentStep = stepNumber;
        steps.forEach(step => step.classList.remove('active'));
        document.getElementById(`step${stepNumber}`).classList.add('active');
        
        // Update button visibility
        if (stepNumber === 1) {
            prevStepBtn.style.display = 'none';
            nextStepBtn.style.display = 'block';
            postJobFinalBtn.style.display = 'none';
        } else if (stepNumber === steps.length) {
            prevStepBtn.style.display = 'block';
            nextStepBtn.style.display = 'none';
            postJobFinalBtn.style.display = 'block';
        } else {
            prevStepBtn.style.display = 'block';
            nextStepBtn.style.display = 'block';
            postJobFinalBtn.style.display = 'none';
        }
    }
    
    // Go to next step
    function goToNextStep() {
        if (currentStep < steps.length) {
            showStep(currentStep + 1);
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }
    
    // Update escrow amount based on payment and urgency
    function updateEscrowAmount() {
        let amount = parseInt(jobPayment.value) || 0;
        if (urgentToggle.checked) {
            amount = Math.floor(amount * 1.1);
        }
        escrowAmount.textContent = amount;
    }
    
    // Post new job
    function postNewJob() {
        if (!selectedJobType) {
            alert('Please select a job type');
            showStep(1);
            return;
        }
        
        const newJob = {
            id: sampleJobs.length + 1,
            type: selectedJobType,
            title: document.getElementById('job-title').value || 'Untitled Job',
            description: document.getElementById('job-description').value || 'No description provided',
            duration: parseInt(jobDuration.value) || 30,
            payment: parseInt(jobPayment.value) || 100,
            distance: (Math.random() * 0.9 + 0.1).toFixed(1), // Random distance for demo
            urgent: urgentToggle.checked,
            poster: {
                name: 'You',
                avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                rating: 5.0,
                jobsPosted: 1,
                verified: true
            }
        };
        
        sampleJobs.unshift(newJob);
        closeAllModals();
        renderJobFeed();
        checkEmptyState();
        
        // Reset form
        document.getElementById('job-title').value = '';
        document.getElementById('job-description').value = '';
        jobDuration.value = 30;
        durationValue.textContent = '30';
        jobPayment.value = '200';
        urgentToggle.checked = false;
        selectedJobType = null;
        jobTypeBtns.forEach(b => b.classList.remove('active'));
        showStep(1);
    }
    
    // Check if job feed is empty
    function checkEmptyState() {
        if (sampleJobs.length === 0) {
            listView.classList.remove('active');
            emptyState.classList.add('active');
        } else {
            emptyState.classList.remove('active');
            listView.classList.add('active');
        }
    }
    
    // Initialize the app
    initApp();
});