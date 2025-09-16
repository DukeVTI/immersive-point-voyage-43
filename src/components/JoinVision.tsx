import { useEffect, useRef, useState } from 'react';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { FormSelect } from '@/components/ui/form-select';
import { useFormValidation } from '@/hooks/use-form-validation';
import { toast } from '@/hooks/use-toast';

export const JoinVision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interestArea: '',
    message: ''
  });
  
  const { errors, isSubmitting, isSubmitted, submitForm, resetForm } = useFormValidation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    
    if (success) {
      toast({
        title: "Thank you for your inquiry!",
        description: "We'll be in touch within 24 hours to discuss your vision.",
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        interestArea: '',
        message: ''
      });
    }
  };

  const interestOptions = [
    { value: '', label: 'Interest Area' },
    { value: 'investor', label: 'Investment Opportunities' },
    { value: 'creative', label: 'Creative Collaboration' },
    { value: 'property', label: 'Property Partnership' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <section id="join-vision" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-matte-black relative isolate z-40" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 md:space-y-16">
          {/* Header */}
          <div className="fade-in-up">
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-ghost-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
              Join the Vision
            </h2>
            <p className="font-minimal text-sm sm:text-base md:text-lg text-ghost-white/70 leading-relaxed max-w-2xl mx-auto px-2 sm:px-4">
              We're building the future of hospitality with visionary partners 
              who share our commitment to extraordinary experiences.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="fade-in-up grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-3xl mx-auto">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full" />
              </div>
              <h3 className="font-editorial text-lg sm:text-xl md:text-2xl text-ghost-white">
                For Investors
              </h3>
              <p className="font-minimal text-sm sm:text-base text-ghost-white/70 leading-relaxed px-2 sm:px-0">
                Be part of redefining luxury hospitality. Join us in creating 
                extraordinary spaces that generate exceptional returns.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full" />
              </div>
              <h3 className="font-editorial text-lg sm:text-xl md:text-2xl text-ghost-white">
                For Creatives
              </h3>
              <p className="font-minimal text-sm sm:text-base text-ghost-white/70 leading-relaxed px-2 sm:px-0">
                Collaborate with our team to push the boundaries of design, 
                technology, and experiential hospitality.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-up max-w-xl mx-auto relative z-40 pointer-events-auto px-2 sm:px-0">
            {isSubmitted ? (
              <div className="bg-ghost-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8 border border-ghost-white/30 rounded-lg text-center space-y-4 sm:space-y-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-editorial text-lg sm:text-xl text-ghost-white">Thank You!</h3>
                <p className="font-minimal text-xs sm:text-sm text-ghost-white/70 px-2 sm:px-0">
                  Your inquiry has been received. We'll be in touch within 24 hours to discuss your vision.
                </p>
                <button 
                  onClick={resetForm}
                  className="font-minimal text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <div className="bg-ghost-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8 border border-ghost-white/30 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormInput
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      error={errors.firstName}
                      disabled={isSubmitting}
                    />
                    <FormInput
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      error={errors.lastName}
                      disabled={isSubmitting}
                    />
                  </div>
                  <FormInput
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    disabled={isSubmitting}
                  />
                  <FormSelect
                    value={formData.interestArea}
                    onChange={(e) => handleInputChange('interestArea', e.target.value)}
                    options={interestOptions}
                    error={errors.interestArea}
                    disabled={isSubmitting}
                  />
                  <FormTextarea
                    placeholder="Tell us about your vision..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    error={errors.message}
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-4 bg-matte-black text-ghost-white font-minimal text-xs sm:text-sm tracking-widest uppercase transition-all duration-500 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-accent/20 transform transition-transform duration-500 ${isSubmitting ? 'translate-x-0' : '-translate-x-full'}`} />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-ghost-white/20 border-t-ghost-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Inquiry'
                      )}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};