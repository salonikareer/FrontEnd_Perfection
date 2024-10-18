import React, { useState, useEffect } from 'react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const courses = [
    { id: 1, title: "Introduction to AI and Machine Learning", category: "ai-ml", instructor: "Dr. Jane Smith", level: "Beginner", duration: "8 weeks", enrolled: 1234, rating: 4.8 },
    { id: 2, title: "Advanced Data Science and Analytics", category: "data-science", instructor: "Prof. John Doe", level: "Advanced", duration: "10 weeks", enrolled: 987, rating: 4.9 },
    { id: 3, title: "Full-Stack Web Development Bootcamp", category: "web-development", instructor: "Sarah Johnson", level: "Intermediate", duration: "12 weeks", enrolled: 2345, rating: 4.7 },
    { id: 4, title: "Blockchain and Cryptocurrency Fundamentals", category: "blockchain", instructor: "Dr. Michael Chen", level: "Beginner", duration: "6 weeks", enrolled: 765, rating: 4.6 },
    { id: 5, title: "UX/UI Design Masterclass", category: "design", instructor: "Emily Rodriguez", level: "Intermediate", duration: "8 weeks", enrolled: 1543, rating: 4.9 },
    { id: 6, title: "Cloud Computing and DevOps", category: "cloud-devops", instructor: "Alex Thompson", level: "Advanced", duration: "10 weeks", enrolled: 876, rating: 4.8 },
  ]

  const testimonials = [
    { id: 1, name: "Alex Thompson", role: "Software Developer", image: "./course.jpeg", quote: "EduLearn has transformed my career. The courses are engaging, and the instructors are top-notch. I've gained valuable skills that I use every day in my job." },
    { id: 2, name: "Sarah Lee", role: "Data Scientist", image: "./course.jpeg", quote: "The AI and Machine Learning course was exactly what I needed to transition into my dream role. The hands-on projects were particularly valuable." },
    { id: 3, name: "Mike Johnson", role: "UX Designer", image: "./course.jpeg", quote: "I was skeptical about online learning, but EduLearn exceeded my expectations. The UX/UI Design Masterclass helped me land a great job in the field." },
  ]

  const filteredCourses = activeTab === 'all' ? courses : courses.filter(course => course.category === activeTab)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)
      const difference = target.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days: d, hours: h, minutes: m, seconds: s })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-purple-600">EduLearn.edu</h1>
            <button 
              className="md:hidden text-purple-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent z-20`}>
              <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
                <li><a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">Home</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">Courses</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">About</a></li>
                <li><a href="#" className="text-purple-600 hover:text-purple-800 transition duration-300">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in-down">Unlock Your Potential with EduLearn</h2>
          <p className="text-xl mb-8 animate-fade-in-up">Empowering minds through cutting-edge online education</p>
          <a href="#" className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition duration-300 animate-bounce">
            Explore Courses
          </a>
          <div className="mt-12 grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {Object.entries(countdown).map(([unit, value]) => (
              <div key={unit} className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm uppercase">{unit}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg">Until next course enrollment deadline</p>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-800">Featured Courses</h2>
          <div className="flex justify-center space-x-4 mb-8 flex-wrap">
            <button 
              onClick={() => setActiveTab('all')} 
              className={`px-4 py-2 rounded-full mb-2 ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-600'}`}
            >
              All
            </button>
            {['ai-ml', 'data-science', 'web-development', 'blockchain', 'design', 'cloud-devops'].map((category) => (
              <button 
                key={category}
                onClick={() => setActiveTab(category)} 
                className={`px-4 py-2 rounded-full mb-2 ${activeTab === category ? 'bg-purple-600 text-white' : 'bg-gray-200 text-purple-600'}`}
              >
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <img src="./course.jpeg" alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-purple-700">{course.title}</h3>
                  <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{course.enrolled.toLocaleString()} students</span>
                    <span className="flex items-center text-yellow-500">
                      {course.rating}
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                  <a href="#" className="block text-center bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300">Enroll Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-purple-100 to-indigo-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-800">Why Choose EduLearn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <svg className="w-12 h-12 mx-auto mb-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals and experienced educators.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <svg className="w-12 h-12 mx-auto mb-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Flexible Learning</h3>
              <p className="text-gray-600">Study at your own pace with our on-demand video lessons.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <svg className="w-12 h-12 mx-auto mb-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2  4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Recognized Certificates</h3>
              <p className="text-gray-600">Earn certificates upon completion to boost your resume.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center my-auto">
          <h2 className="text-3xl font-bold mb-8 text-purple-800">What Our Students Say</h2>
          <div className="max-w-4xl mx-auto bg-purple-100 rounded-lg shadow-lg p-8 h-96 relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`transition-opacity duration-500 absolute inset-0 flex items-center justify-center p-8 ${
                  index === currentTestimonial ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div>
                  <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                  <blockquote className="text-xl italic mb-4 text-purple-800">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-semibold text-purple-600">{testimonial.name}</p>
                  <p className="text-purple-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8">Join thousands of students and advance your career today!</p>
          <a href="#" className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition duration-300 inline-block">
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">EduLearn.edu</h3>
              <p className="mb-4">Empowering minds through quality online education since 2010.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Instructors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="mb-4">Stay updated with our latest courses and offers.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-2 rounded-l-full text-gray-900"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-r-full hover:bg-purple-700 transition duration-300"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 EduLearn.edu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
