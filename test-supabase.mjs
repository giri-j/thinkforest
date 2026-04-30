import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szjcitwlvndnlechvvwf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6amNpdHdsdm5kbmxlY2h2dndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODQ2NDMsImV4cCI6MjA5MzA2MDY0M30.TBXe-_Q3aK0lQRP7kVgXaFbBhD4K0vY66dmzBLmu-nY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ name: 'Test', content: 'Test message' }])
    .select();
    
  if (error) {
    console.error('Insert Error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
