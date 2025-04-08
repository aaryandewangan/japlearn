const updateProgress = async (lessonId: string, score: number) => {
  try {
    const response = await fetch('/api/user/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lessonId,
        completed: true,
        score,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    // Assuming showToast is a function or object that needs to be imported or defined
    // If showToast is a function, it should be imported or defined before this selection
    // If showToast is an object, it should be imported or defined before this selection and its methods should be called correctly

    // Show success message or redirect
    // showToast.success('Progress saved!'); // This line should be replaced with the correct way to call showToast
    console.log('Progress saved!'); // Placeholder for success message
  } catch (error) {
    console.error('Failed to update progress:', error);
    // showToast.error('Failed to save progress'); // This line should be replaced with the correct way to call showToast
    console.error('Failed to save progress'); // Placeholder for error message
  }
}; 