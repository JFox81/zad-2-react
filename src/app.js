import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const handlePrev = () => {
		if (!isFirstStep) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const handleNext = () => {
		if (!isLastStep) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const handleReset = () => {
		setActiveIndex(0);
	};

	const handleStepClick = (index) => {
		if (index >= 0 && index < steps.length) {
			setActiveIndex(index);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => (
							<li
								key={index}
								className={`${styles['steps-item']} ${
									index < activeIndex ? styles.done : ''
								} ${index === activeIndex ? styles.active : ''}`}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => handleStepClick(index)}
									aria-label={`Перейти к шагу ${index + 1}`}
								>
									{index + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handlePrev}
							disabled={isFirstStep}
							aria-label="Перейти к предыдущему шагу"
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? handleReset : handleNext}
							aria-label={isLastStep ? "Начать сначала" : "Перейти к следующему шагу"}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
