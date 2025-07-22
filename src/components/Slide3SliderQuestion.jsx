import { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { trackButtonClick, trackQuizAnswer, trackSliderInteraction, trackTimeSpent } from '../utils/analytics';
import { SlideTracker, TrackedButton, TrackedSlider } from './shared/SlideTracker';

export const Slide3SliderQuestion = ({ scroll }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [startTime] = useState(Date.now());

  const handleSliderChange = (value) => {
    const previousValue = sliderValue;
    setSliderValue(value);

    trackSliderInteraction('probability_slider', value, {
      previousValue,
      questionType: 'probability_estimation',
      slideNumber: 3
    });
  };

  const handleSubmit = () => {
    const timeSpent = Date.now() - startTime;

    // Track the quiz answer
    trackQuizAnswer('probability_estimation', sliderValue, null, timeSpent);

    // Track time spent on slide
    trackTimeSpent('slide_3_slider', timeSpent, 'interactive');

    // Navigate to next slide
    scroll(4);
  };

  useEffect(() => {
    // Track when user views this question
    trackTimeSpent('slide_3_view', 0, 'passive');
  }, []);

  return (
    <SlideTracker
      slideNumber={3}
      slideName="Slider Question"
      trackMouse={true}
      trackScrolling={true}
      trackEngagement={true}
    >
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-mono">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="text-center border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
              Probability Estimation
            </h2>
            <p className="text-lg text-black font-mono">
              Use the slider below to estimate your probability of success.
            </p>
          </div>

          {/* Question */}
          <div className="border-4 border-blue-600 rounded-xl p-8 bg-blue-50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-blue-700 tracking-tight">Question</h3>
            </div>

            <p className="text-xl text-black leading-relaxed mb-8 font-bold">
              What do you think is the probability that you will answer the next programming question correctly?
            </p>

            {/* Slider Section */}
            <div className="bg-white border-4 border-blue-600 rounded-xl p-8">
              <div className="mb-6">
                <label className="block text-lg font-bold text-black mb-4">
                  Your probability: <span className="text-blue-600">{sliderValue}%</span>
                </label>

                <div className="relative">
                  <TrackedSlider
                    trackingId="probability_estimation_slider"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    trackingContext={{
                      questionType: 'probability_estimation',
                      slideNumber: 3
                    }}
                  />

                  {/* Slider Labels */}
                  <div className="flex justify-between mt-3 text-sm font-bold text-gray-600">
                    <span>0% (Very Unlikely)</span>
                    <span>50% (Uncertain)</span>
                    <span>100% (Very Likely)</span>
                  </div>
                </div>
              </div>

              {/* Visual Feedback */}
              <div className="mt-6 p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-gray-700">Your Confidence Level:</span>
                </div>
                <div className="text-lg font-bold">
                  {sliderValue < 30 && <span className="text-red-600">Low Confidence</span>}
                  {sliderValue >= 30 && sliderValue < 70 && <span className="text-yellow-600">Moderate Confidence</span>}
                  {sliderValue >= 70 && <span className="text-green-600">High Confidence</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <TrackedButton
              onClick={handleSubmit}
              trackingName="submit_probability_estimate"
              trackingContext={{
                sliderValue,
                timeSpent: Date.now() - startTime,
                slideNumber: 3
              }}
              className="px-12 py-4 bg-blue-600 text-white border-4 border-black rounded-xl hover:bg-white hover:text-blue-600 transition-all text-xl font-bold uppercase tracking-wider shadow-lg"
            >
              Continue →
            </TrackedButton>
          </div>
        </div>
      </div>
    </SlideTracker>
  );
};