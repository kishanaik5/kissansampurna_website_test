
const testAPI = async () => {
    const baseUrl = 'http://localhost:8000';

    console.log(`Testing API at ${baseUrl}...`);

    try {
        // Test Root
        const rootRes = await fetch(`${baseUrl}/`);
        const rootData = await rootRes.json();
        console.log('GET /:', rootData);

        // Test GET Blogs
        const blogsRes = await fetch(`${baseUrl}/blogs`);
        if (blogsRes.ok) {
            const blogs = await blogsRes.json();
            console.log(`GET /blogs: Found ${blogs.length} blogs.`);
            if (blogs.length > 0) console.log('- First blog:', blogs[0].blog_title);
        } else {
            console.error('GET /blogs FAILED:', blogsRes.status);
        }

        // Test GET Products
        const productsRes = await fetch(`${baseUrl}/products`);
        if (productsRes.ok) {
            const products = await productsRes.json();
            console.log(`GET /products: Found ${products.length} products.`);
        } else {
            console.error('GET /products FAILED:', productsRes.status);
        }

    } catch (error) {
        console.error('API Test Failed:', error.message);
    }
};

testAPI();
