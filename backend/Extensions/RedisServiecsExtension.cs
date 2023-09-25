using backend.Dao.Repository;
using backend.Model;
using StackExchange.Redis;

namespace backend.Extensions
{
    public static class RedisServiecsExtension
    {
        public static IServiceCollection AddRedis(this IServiceCollection services, IConfiguration configuration)
        {
            var redisConfiguration = new RedisConfiguration();
            configuration.GetSection("RedisConfiguration").Bind(redisConfiguration);
            services.AddSingleton(redisConfiguration);
            if(!redisConfiguration.Enabled)
            {
                return services;
            }
            services.AddSingleton<IConnectionMultiplexer>(_ => ConnectionMultiplexer.Connect(redisConfiguration.ConnectionString));
            services.AddSingleton(typeof(IResponseCacheService),typeof(ResponseCacheService));
            services.AddMemoryCache();

            return services;
        }
    }
}
