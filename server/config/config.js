const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 4100;
    process.env.JWT_SECRET = 'international';
    process.env.MONGO_URI = 'mongodb://localhost:27017/BlogApp'
}