# YouTube Video Summarizer

A powerful full-stack application that generates AI-powered summaries of YouTube videos using Nhost, Next.js, and n8n.

## 🌟 Features

- **Smart Video Summaries**: AI-powered summaries that capture key points and insights
- **Multiple Summary Types**:
  - Comprehensive summaries
  - Chapter-based breakdowns
  - Key points extraction
  - Action items identification
- **Real-time Processing**: Track summary generation progress in real-time
- **User Management**: Secure authentication and personalized dashboards
- **Multi-language Support**: Summaries in various languages
- **Responsive Design**: Works seamlessly across all devices
- **Accessibility**: WCAG 2.1 compliant

## 🏗️ Architecture

### Backend (Nhost)
- **Authentication**: Email/password and OAuth (Google, GitHub)
- **Database**: PostgreSQL with Hasura GraphQL
- **Storage**: Secure file storage for transcripts and summaries
- **Security**: JWT tokens, RBAC, and input validation

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for modern UI
- **State Management**: React Query and Zustand
- **Components**: Reusable, accessible components
- **Performance**: Optimized with lazy loading and caching

### Workflow Automation (n8n)
- **Video Processing**: YouTube data extraction
- **Transcript Generation**: Multi-language support
- **Summary Generation**: OpenRouter LLM integration
- **Error Handling**: Automatic retries and fallbacks

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Nhost CLI
- n8n
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd youtube-video-summarizer
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

4. Start the development servers:
   ```bash
   # Start Nhost
   nhost dev

   # Start frontend
   cd frontend
   npm run dev

   # Start n8n
   n8n start
   ```

## 🔧 Configuration

### Nhost Setup
1. Create a Nhost project
2. Configure authentication providers
3. Set up storage buckets
4. Apply database migrations

### OpenRouter Setup
1. Get API key from OpenRouter
2. Configure model selection
3. Set up rate limiting

### n8n Workflow
1. Import workflow templates
2. Configure nodes
3. Set up error handling

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting
- CORS policies
- Security headers
- Data encryption

## 💪 Scalability

- Microservices architecture
- Stateless services
- Connection pooling
- Caching strategies
- CDN integration
- Database optimization
- Load balancing ready

## 📊 Monitoring

- Error tracking
- Performance monitoring
- User activity logging
- Health checks
- Audit logging
- Automated backups
- Alert notifications

## 🧪 Testing

- Unit tests
- Integration tests
- End-to-end tests
- Performance tests
- Security tests
- Accessibility tests
- Cross-browser tests

## 📖 API Documentation

### GraphQL Endpoints

#### Queries
- `getUserVideos`: Fetch user's video summaries
- `getVideoSummary`: Get specific video summary
- `getProcessingStatus`: Check summary generation status

#### Mutations
- `submitVideo`: Submit video for summarization
- `updatePreferences`: Update user preferences
- `deleteSummary`: Delete a video summary

## 🔄 Handling Multiple Requests

The system is designed to handle multiple concurrent requests efficiently:

1. **Queue Management**:
   - Requests are processed through a queue system
   - Priority-based processing
   - Fair scheduling

2. **Rate Limiting**:
   - Per-user request limits
   - API endpoint throttling
   - Concurrent processing limits

3. **Resource Management**:
   - Connection pooling
   - Worker scaling
   - Memory management

4. **Error Handling**:
   - Automatic retries
   - Circuit breakers
   - Fallback mechanisms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License

## 👥 Support

For support, email support@yourdomain.com or join our Discord community.
