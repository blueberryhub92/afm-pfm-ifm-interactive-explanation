import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { TrackedButton, TrackedSlider } from '../components/shared/SlideTracker';
import { trackButtonClick, trackSliderInteraction, trackCustomEvent } from '../utils/analytics';

export const ProbabilitySliderEstimation = ({ navigate, onDoneClick }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [startTime] = useState(Date.now());

  // Track slide entry
  useEffect(() => {
    trackCustomEvent('slide3_slider_question_entered', {
      slideNumber: 3,
      slideName: 'Probability Slider Question',
      elementType: 'page',
      initialSliderValue: sliderValue,
      viewTimestamp: Date.now()
    });
  }, []);

  const handleSliderChange = (value) => {
    const previousValue = sliderValue;
    setSliderValue(value);

    // Track slider interaction with specific context
    trackSliderInteraction('slide3_probability_slider', value, {
      slideNumber: 3,
      slideName: 'Probability Slider Question',
      elementType: 'slider',
      elementLocation: 'probability_estimation',
      previousValue,
      newValue: value,
      changeAmount: value - previousValue,
      interactionContext: {
        isFirstChange: previousValue === 50,
        direction: value > previousValue ? 'increase' : 'decrease',
        magnitude: Math.abs(value - previousValue)
      }
    });
  };

  const handleDoneClick = () => {
    const timeSpent = Date.now() - startTime;

    // Track done button click with specific context
    trackButtonClick('slide3_probability_done', {
      slideNumber: 3,
      slideName: 'Probability Slider Question',
      elementType: 'button',
      elementLocation: 'probability_submission',
      buttonType: 'submit_probability',
      finalValue: sliderValue,
      timeSpent,
      interactionMetrics: {
        timeToDecision: timeSpent,
        confidenceLevel: sliderValue,
        isExtreme: sliderValue <= 10 || sliderValue >= 90
      }
    });

    // Track completion as custom event
    trackCustomEvent('slide3_probability_estimation_completed', {
      slideNumber: 3,
      slideName: 'Probability Slider Question',
      elementType: 'task',
      taskType: 'probability_estimation',
      completionMetrics: {
        finalValue: sliderValue,
        timeSpent,
        interactionPattern: sliderValue === 50 ? 'unchanged' : 'adjusted'
      }
    });

    onDoneClick();
    navigate(4);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto space-y-8">

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
            <Lightbulb className="w-8 h-8 text-blue-600" />
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
            onClick={handleDoneClick}
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
  );
};