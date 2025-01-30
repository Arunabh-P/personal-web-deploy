import Timeline from '@/components/molecule/timeline';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Timeline Component', () => {
  const mockData = [
    {
      position: 'Software Engineer',
      company: 'Tech Corp',
      startYear: 2020,
      endYear: 2023,
      description: 'Worked on frontend development using React and Next.js.',
      isWork: true,
    },
    {
      position: 'Student',
      company: 'University XYZ',
      startYear: 2016,
      endYear: 2020,
      description: 'Studied Computer Science.',
      isWork: false,
    },
  ];

  it('renders timeline items correctly', () => {
    render(<Timeline data={mockData} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('2020 - 2023')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Worked on frontend development using React and Next.js.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('2016 - 2020')).toBeInTheDocument();
    expect(screen.getByText('University XYZ')).toBeInTheDocument();
    expect(screen.getByText('Studied Computer Science.')).toBeInTheDocument();
  });

  it('displays the correct image for work and student', () => {
    render(<Timeline data={mockData} />);

    const workImage = screen.getAllByAltText('job');
    const studentImage = screen.getAllByAltText('student');

    expect(workImage).toHaveLength(1);
    expect(studentImage).toHaveLength(1);
  });

  it('renders the timeline with correct structure', () => {
    render(<Timeline data={mockData} />);

    const timeline = screen.getByRole('list');
    expect(timeline).toBeInTheDocument();
    expect(timeline).toHaveClass('relative border-s border-black');
  });
});
