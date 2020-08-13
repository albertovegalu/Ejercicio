using AutoMapper;

namespace Ejercicio.Api
{
    public static class ObjectMapping<T, U>
    {
        public static U MapObject(T objectMapping)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(x => { x.CreateMap<T, U>(); });

            IMapper mapper = mapperConfiguration.CreateMapper();

            U objectMapped = mapper.Map<T, U>(objectMapping);

            return objectMapped;
        }
    }
}