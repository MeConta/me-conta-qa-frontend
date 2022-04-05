const { Pool } = require('pg');

const cleanUpDatabase = async (config) => {
    const pool = new Pool({ ...config });
    try {
        await pool.query('DELETE FROM public.atendimentos');
        await pool.query('DELETE FROM public.aluno');
        await pool.query('DELETE FROM public."slot-agenda"');
        await pool.query('DELETE FROM public.voluntario');
        await pool.query('DELETE FROM public.recuperacao');
        await pool.query('DELETE FROM public.perfil');
        // Delete all users except admins 
        await pool.query("DELETE FROM public.usuario WHERE tipo<>'3'");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await pool.end();
    }
}

module.exports = { cleanUpDatabase };