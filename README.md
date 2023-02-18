## YouLearn
YouLearn is a web app that allows users to take notes while watching educational videos. The app is built using Next.js and Supabase for the backend, and Tiptap for the rich text editor.

## Features
- Users can search for educational videos on YouTube and save them to their account
- Users can take notes while watching videos using a rich text editor
- Notes are automatically saved to the user's account and are synchronized across devices
- Users can view their notes on separate pages
## Getting Started
To run the app locally, you will need to set up a Supabase account and obtain a YouTube API key.

### Clone the repository:
```
git clone https://github.com/yourusername/youlearn.git
```
### Install the dependencies:
```
cd youlearn
npm install
```
### Set up environment variables:
Create a new file named .env.local in the root directory of the project, and add the following:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
```
Run the app:
```
npm run dev
```
The app will be running on http://localhost:3000.
