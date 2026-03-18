import type { CollectionAfterDeleteHook } from 'payload'

export const deleteMediaAfterDelete: CollectionAfterDeleteHook = async ({ req, doc }) => {
  // Se o documento deletado tiver referências a mídias, precisamos decidir se as deletamos.
  // No caso desse projeto, o usuário quer que a mídia suma se o objeto pai sumir.
  
  const findAndDeleteMedia = async (mediaId: string | any) => {
    if (!mediaId) return;
    const id = typeof mediaId === 'object' ? mediaId.id : mediaId;
    
    try {
      await req.payload.delete({
        collection: 'media',
        id,
      });
    } catch (err) {
      // Falha silenciosa caso a mídia já tenha sido deletada ou não exista
      console.error(`Falha ao deletar mídia órfã ${id}:`, err);
    }
  };

  // Campos comuns que guardam imagens nos documentos
  const mediaFields = ['coverImage', 'featuredImage', 'audioFile', 'image'];
  
  for (const field of mediaFields) {
    if (doc[field]) {
      await findAndDeleteMedia(doc[field]);
    }
  }
}
